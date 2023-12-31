import matplotlib.pyplot as plt
from pytrends.request import TrendReq
import datetime
import pandas as pd

# Initialize pytrends
pytrends = TrendReq(hl='en-US', tz=360)

def get_average_trend(keyword, days):
    """
    Get the average search trend for a given keyword over the specified number of days.
    """
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=days)
    timeframe = f'{start_date} {today}'
    
    pytrends.build_payload(kw_list=[keyword], timeframe=timeframe)
    interest_over_time_df = pytrends.interest_over_time()
    
    return interest_over_time_df[keyword].mean()

def get_daily_trends_last_week(keyword):
    """
    Get the daily search trends for the last 7 days for a given keyword.
    """
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=7)
    timeframe = f'{start_date} {today}'
    
    pytrends.build_payload(kw_list=[keyword], timeframe=timeframe)
    interest_over_time_df = pytrends.interest_over_time()
    
    return interest_over_time_df[keyword]

def get_rolling_monthly_averages_for_last_n_days(keyword, n):
    """
    Calculate the average search trend for a range of dates that shifts back one day at a time over the last n days.
    """
    today = datetime.date.today() # Replace with specific date if needed
    daily_averages = {}

    for days_back in range(n):
        end_date = today - datetime.timedelta(days=days_back)
        if end_date.month == today.month:
            start_date = end_date.replace(day=1)
        else:
            first_of_month = end_date.replace(day=1)
            start_date = (first_of_month - datetime.timedelta(days=1)).replace(day=1)

        timeframe = f'{start_date} {end_date}'
        pytrends.build_payload(kw_list=[keyword], timeframe=timeframe)
        interest_over_time_df = pytrends.interest_over_time()
        daily_averages[end_date] = interest_over_time_df[keyword].mean()

    return pd.Series(daily_averages)

def plot_trend_graphs(datasets, titles):
    """
    Plot multiple graphs side by side given a list of DataFrames containing trend data and their corresponding titles.
    """
    num_graphs = len(datasets)
    fig, axes = plt.subplots(1, num_graphs, figsize=(15, 5))

    for i in range(num_graphs):
        axes[i].plot(datasets[i])
        axes[i].set_title(titles[i])
        axes[i].set_ylabel('Trend')
        axes[i].set_xlabel('Date')
        axes[i].grid(True)

    plt.tight_layout()
    plt.show()
def get_normalized_trends(keyword, last_n_days=30, min_value=0.8, max_value=1.2):
    """
    Fetch Google Trends data for the last n days and normalize it to a range between min_value and max_value.

    :param keyword: Keyword to search in Google Trends
    :param last_n_days: Number of days to look back
    :param min_value: Minimum value of the normalized range
    :param max_value: Maximum value of the normalized range
    :return: Pandas Series with normalized values for each day
    """
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=last_n_days)
    timeframe = f'{start_date} {today}'

    pytrends.build_payload(kw_list=[keyword], timeframe=timeframe)
    interest_over_time_df = pytrends.interest_over_time()

    # Normalize the values to the specified range
    min_trend = interest_over_time_df[keyword].min()
    max_trend = interest_over_time_df[keyword].max()
    normalized_trends = (interest_over_time_df[keyword] - min_trend) / (max_trend - min_trend)
    normalized_trends = normalized_trends * (max_value - min_value) + min_value

    return normalized_trends

def get_current_or_previous_day_normalized_trend(keyword, last_n_days=30, min_value=0.8, max_value=1.2, today= datetime.date.today()):
    """
    Fetch Google Trends data for the last n days, normalize it, and return the value for the current day.
    If the current day's data is not available, return the most recent available day's data.

    :param keyword: Keyword to search in Google Trends
    :param last_n_days: Number of days to look back
    :param min_value: Minimum value of the normalized range
    :param max_value: Maximum value of the normalized range
    :return: Normalized value for the current or most recent day
    """
    start_date = today - datetime.timedelta(days=last_n_days)
    timeframe = f'{start_date} {today}'

    pytrends.build_payload(kw_list=[keyword], timeframe=timeframe)
    interest_over_time_df = pytrends.interest_over_time()

    if interest_over_time_df.empty:
        return None

    # Normalize the values to the specified range
    min_trend = interest_over_time_df[keyword].min()
    max_trend = interest_over_time_df[keyword].max()
    normalized_trends = (interest_over_time_df[keyword] - min_trend) / (max_trend - min_trend)
    normalized_trends = normalized_trends * (max_value - min_value) + min_value

    # Get the value for the current day, or the most recent day if current day's data is not available
    current_day_value = normalized_trends.get(today.strftime('%Y-%m-%d'))
    if current_day_value is not None:
        return current_day_value
    else:
        # Return the most recent day's data
        return normalized_trends.iloc[-1]


def calculate_hourly_price(operational_cost_per_hour, google_trends_factor, profit_margin_percentage):
    """
    Calculate the hourly rental price, adjusting based on Google Trends data and desired profit margin.

    :param operational_cost_per_hour: Operational cost per hour
    :param google_trends_factor: Adjustment factor from Google Trends (e.g., 1.0 for average demand, >1.0 for high demand)
    :param profit_margin_percentage: Desired profit margin in percentage
    :return: Calculated hourly rental price
    """
    base_price = operational_cost_per_hour * google_trends_factor
    price_with_profit = base_price * (1 + profit_margin_percentage / 100)
    return price_with_profit


# Assuming the rolling monthly average from Google Trends is used as a factor (e.g., 1.2 for 20% higher than average demand)


# Example usage
keyword = 'autonomous vehicles'
# average_trend_30_days = get_average_trend(keyword, 30)
# daily_trends_last_week = get_daily_trends_last_week(keyword)
# rolling_monthly_averages_week = get_rolling_monthly_averages_for_last_n_days(keyword, 7)
# rolling_monthly_averages_month = get_rolling_monthly_averages_for_last_n_days(keyword, 30)

# Plotting side by side
# plot_trend_graphs([daily_trends_last_week, rolling_monthly_averages_week, rolling_monthly_averages_month], 
#                   ['Daily Trends - Last 7 Days', 'Rolling Monthly Averages - Last 7 Days', 'Rolling Monthly Averages - Last 30 Days'])

# print(f"Average trend for '{keyword}' in the last 30 days: {average_trend_30_days}")


# Example usage
# maintenance = 10000  # Example cost in eur
# staff = 5000         # Example cost in eur
# utilities = 2000     # Example cost in eur
# insurance = 3000     # Example cost in eur
# profit_margin = 20   # 20% profit margin
# average_demand = 50  # Estimated rentals per month


current_day_normalized_trend = get_current_or_previous_day_normalized_trend(keyword)
print(f"{current_day_normalized_trend=}")


# Example usage
operational_cost_hourly = 200  # Example cost in eyr per hour
profit_margin = 20             # 20% profit margin

hourly_price = calculate_hourly_price(operational_cost_hourly, current_day_normalized_trend, profit_margin)
print(f"Recommended Hourly Rental Price: ${hourly_price:.2f}")


# Collecting normalized trends for each day of the last 30 days
price_values = []
dates = []
today = datetime.date.today()

for day_back in range(30):
    specific_day = today - datetime.timedelta(days=day_back)
    normalized_trend = get_current_or_previous_day_normalized_trend(keyword, today=specific_day)
    price_values.append(calculate_hourly_price(operational_cost_hourly, normalized_trend, profit_margin))
    dates.append(specific_day)

# Convert to a pandas Series for easy plotting
trend_series = pd.Series(price_values, index=dates)

# Plotting
plt.figure(figsize=(12, 6))
trend_series.plot(marker='o')
plt.title(f"Calculated price suggestions over the Last 30 Days")
plt.xlabel('Date')
plt.ylabel('Price')
plt.grid(True)
plt.gca().invert_xaxis()  # Invert x-axis to show the most recent date on the right
plt.show()