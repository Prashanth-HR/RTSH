export const json = {
    "title": "STUWERK TRACKS",
    "description": "1901 Thornridge Cir. Shiloh, Hawaii 81063 +1 (808) 555-0111",
    "logo": "https://api.surveyjs.io/private/Surveys/files?name=cd99ec15-4054-4e75-8e42-9edff605a5d4",
    "logoWidth": "auto",
    "logoHeight": "80",
    "completedHtml": "<div style=\"max-width:688px;text-align:center;margin: 16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Thank you for choosing us.</h4>\n<br>\n<p>Dear {firstname-for-complete-page}, we're thrilled to have you on board and excited to be a part of your upcoming journey. Your reservation is confirmed, and we can't wait to make your travel experience exceptional.</p>\n</div>\n\n</div>\n",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "check-in-date",
        "width": "37%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "description": "Booking start date",
        "descriptionLocation": "underInput",
        "defaultValueExpression": "today()",
        "validators": [
         {
          "type": "expression",
          "text": "Booking start date cannot precede today's date.",
          "expression": "{check-in-date} >= today()"
         }
        ],
        "inputType": "date",
        "placeholder": "Booking start date"
       },
       {
        "type": "text",
        "name": "check-out-date",
        "width": "37%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "description": "Booking end date",
        "descriptionLocation": "underInput",
        "defaultValueExpression": "today(1)",
        "validators": [
         {
          "type": "expression",
          "text": "Invalid date range: Booking end date date cannot precede check-in date.",
          "expression": "getDate({check-out-date}) >= getDate({check-in-date})"
         }
        ],
        "inputType": "date",
        "placeholder": "Booking end date"
       },
       
       
       /* {
        "type": "dropdown",
        "name": "number-of-guests",
        "width": "26%",
        "minWidth": "192px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "choices": [ 1, 2, 3, 4, 5, 6, 7, 8, 9,
         { "value": "10", "text": "10+" }
        ],
        "placeholder": "# of tracks",
        "allowClear": false
       },
       {
        "type": "dropdown",
        "name": "room-type",
        "useDisplayValuesInDynamicTexts": false,
        "width": "74%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "choices": [
         {
          "value": "queen",
          "text": "Queen Room"
         },
         {
          "value": "king",
          "text": "King Room"
         },
         {
          "value": "deluxe-king",
          "text": "Deluxe King Room"
         },
         {
          "value": "superior-king",
          "text": "Superior King Room"
         }
        ],
        "placeholder": "Track type",
        "allowClear": false
       },
       {
        "type": "checkbox",
        "name": "non-smoking",
        "width": "26%",
        "minWidth": "192px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "choices": [
         {
          "value": "true",
          "text": "Non-smoking"
         }
        ]
       },
       {
        "type": "image",
        "name": "king-room-image",
        "visibleIf": "{room-type} = 'king'",
        "width": "37%",
        "minWidth": "192px",
        "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=31ba1c67-201e-458e-b30b-86b45ba25f40",
        "imageFit": "cover",
        "imageHeight": "224",
        "imageWidth": "1000"
       },
       {
        "type": "html",
        "name": "king-room-description",
        "visibleIf": "{room-type} = 'king'",
        "width": "63%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "html": "<h4 style=\"padding-top:16px\">King Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nOur King Room offers spacious luxury with a king-sized bed for a great night's sleep. Stay connected with complimentary Wi-Fi, refresh in the private bathroom, and enjoy in-room entertainment with a flat-screen TV. Keep your favorite beverages cool in the mini-fridge, and start your day right with a coffee from the in-room coffee maker. The ideal retreat for your travels.\n</p>\n\n"
       },
       {
        "type": "image",
        "name": "deluxe-king-room-image",
        "visibleIf": "{room-type} = 'deluxe-king'",
        "width": "37%",
        "minWidth": "192px",
        "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=4fc633b5-0ac3-48f5-9728-284446e72adf",
        "imageFit": "cover",
        "imageHeight": "224",
        "imageWidth": "1000"
       },
       {
        "type": "html",
        "name": "deluxe-king-room-description",
        "visibleIf": "{room-type} = 'deluxe-king'",
        "width": "63%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "html": "<h4 style=\"padding-top:16px\">Deluxe King Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nElevate your stay in our Deluxe King Room. Experience ultimate comfort on a luxurious king-sized bed. Enjoy the convenience of complimentary Wi-Fi, a private bathroom, and entertainment on a flat-screen TV. Stay refreshed with a well-stocked mini-fridge and coffee maker. With added space and upscale amenities, this room offers a touch of luxury for a truly special stay.\n</p>\n\n"
       },
       {
        "type": "image",
        "name": "queen-room-image",
        "visibleIf": "{room-type} = 'queen'",
        "width": "37%",
        "minWidth": "192px",
        "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=2e2bc916-6f2e-47ff-b321-74b34118a748",
        "imageFit": "cover",
        "imageHeight": "224",
        "imageWidth": "1000"
       },
       {
        "type": "html",
        "name": "queen-room-description",
        "visibleIf": "{room-type} = 'queen'",
        "width": "63%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "html": "<h4 style=\"padding-top:16px\">Queen Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nExperience comfort and convenience in our Queen Room. Unwind on a cozy queen-sized bed, stay connected with complimentary Wi-Fi, and enjoy the convenience of a private bathroom. For your entertainment, there's a flat-screen TV. A mini-fridge and coffee maker are at your disposal for added convenience. Your perfect choice for a relaxing stay.\n</p>\n\n"
       },
       {
        "type": "image",
        "name": "superior-king-room-image",
        "visibleIf": "{room-type} = 'superior-king'",
        "width": "37%",
        "minWidth": "192px",
        "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=e16770dd-818c-4847-8b7f-19ee527420c1",
        "imageFit": "cover",
        "imageHeight": "224",
        "imageWidth": "1000"
       },
       {
        "type": "html",
        "name": "superior-king-room-description",
        "visibleIf": "{room-type} = 'superior-king'",
        "width": "63%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "html": "<h4 style=\"padding-top:16px\">Superior King Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nIndulge in the epitome of luxury in our Superior King Room. Experience ample space and opulence with a king-sized bed. Complimentary Wi-Fi keeps you connected, while the private bathroom and flat-screen TV provide comfort and entertainment. Enjoy the convenience of a well-equipped mini-fridge and coffee maker. This room is the top choice for a superior and memorable stay.\n</p>\n\n"
       },
       {
        "type": "dropdown",
        "name": "number-of-rooms",
        "width": "37%",
        "minWidth": "192px",
        "titleLocation": "hidden",
        "choices": [ 1, 2, 3, 4, 5 ],
        "placeholder": "# of rooms",
        "allowClear": false
       },
       {
        "type": "checkbox",
        "name": "with-pets",
        "width": "63%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "choices": [
         {
          "value": "true",
          "text": "I am traveling with pets"
         }
        ]
       },
       {
        "type": "tagbox",
        "name": "extras",
        "width": "100%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "choices": [
           "Breakfast",
           "Fitness",
           "Parking",
           "Swimming pool",
           "Restaurant",
           "Spa"
        ],
        "placeholder": "Extras"
       },
       {
        "type": "comment",
        "name": "notes",
        "width": "100%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "placeholder": "Notes...",
        "autoGrow": true,
        "allowResize": false
       } */

       {
        "type": "text",
        "name": "last-name",
        "width": "64%",
        "minWidth": "192px",
        "titleLocation": "hidden",
        "description": "Must match the passport exactly",
        "descriptionLocation": "underInput",
        "placeholder": "Last name"
       },
       {
        "type": "text",
        "name": "first-name",
        "width": "36%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "placeholder": "First name"
       },
       {
        "type": "text",
        "name": "phone",
        "width": "64%",
        "minWidth": "192px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "description": "Example: +1 (555) 777-55-22",
        "descriptionLocation": "underInput",
        "placeholder": "Phone"
       }
      ]
     }, 
     
     {
      "name": "page2",
      "elements": [
       {
        "type": "text",
        "name": "last-name",
        "width": "64%",
        "minWidth": "192px",
        "titleLocation": "hidden",
        "description": "Must match the passport exactly",
        "descriptionLocation": "underInput",
        "placeholder": "Last name"
       },
       {
        "type": "text",
        "name": "first-name",
        "width": "36%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "placeholder": "First name"
       },
       {
        "type": "text",
        "name": "address-line-1",
        "width": "100%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "descriptionLocation": "underInput",
        "placeholder": "Address line 1"
       },
       {
        "type": "text",
        "name": "address-line-2",
        "width": "100%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "placeholder": "Address line 2"
       },
       {
        "type": "text",
        "name": "city",
        "width": "36%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "placeholder": "City"
       },
       {
        "type": "text",
        "name": "zip",
        "width": "28%",
        "minWidth": "192px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "placeholder": "Zip code"
       },
       {
        "type": "text",
        "name": "state",
        "width": "36%",
        "minWidth": "256px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "placeholder": "State"
       },
       {
        "type": "dropdown",
        "name": "country",
        "width": "36%",
        "minWidth": "256px",
        "titleLocation": "hidden",
        "choicesByUrl": {
         "url": "https://surveyjs.io/api/CountriesExample"
        },
        "placeholder": "Country",
        "allowClear": false
       },
       {
        "type": "text",
        "name": "phone",
        "width": "64%",
        "minWidth": "192px",
        "startWithNewLine": false,
        "titleLocation": "hidden",
        "description": "Example: +1 (555) 777-55-22",
        "descriptionLocation": "underInput",
        "placeholder": "Phone"
       }
      ]
     }
    ],
    "calculatedValues": [{
       "name": "firstname-for-complete-page",
       "expression": "iif({first-name} notempty, {first-name}, guests)"
    }],
    "showPrevButton": false,
    "showQuestionNumbers": "off",
    "questionErrorLocation": "bottom",
    "pagePrevText": "Booking Details",
    "pageNextText": "Check the booking",
    "completeText": "Book Now",
    "widthMode": "static",
    "width": "904",
    "fitToContainer": true,
    "headerView": "advanced"
   };