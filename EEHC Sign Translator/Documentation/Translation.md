

![Logo](https://drive.google.com/file/d/1z_xTBMAlD-3KRg0wOlr_peJlrD81J1d4/view?usp=sharing)


# Sign-Language-Translation-API-v3

Webservice to translate text into sign language videos after processing the text , currently it supports Arabic text only


## API Reference

### **Translate paragraph**
We Use the following api to translate paragraphs into sign language.

### **Request Header**
Each Request to the API should include the following parameters in the header of the request.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Accept-Encoding` | `gzip, deflate, br` | **Required**. Accepted encoding types |
| `Content-Type` | `application/x-www-form-urlencoded` | **Required**. Content type|
| `X-Security-Key` | `As agreed with Back End` | **Required**. Securety Key|

------------------------------
### **Requests & Responses**

#### **1- Translate Paragraph**
Translate Paragraphs into sign language.

Request should include the header parameters
```http
    https://signapiv4.kcgpwdapi.org/public/api/sep_ideom
```
##### **Request Parameters**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `parag` | `String` | **Required**. Text user wants to translate|
| `translator` | `Number` | **Required**. Wanted Translator Id|
| `enable_translate_letters` | `Number` | **Optional**. Flag to return letters of word if was not found in DB|
| `enable_formation` | `Number` | **Optional**. Flag to search words with vocalization characters|
| `enable_auto_translate` | `Number` | **Optional**. Flag to return only one word as translation based on frequency|
| `enable_smart_number_reader` | `Number` | **Optional**. Flag to translate Numbers|
| `enable_grammer` | `Number` | **Optional**. Flag to translate words and its pronouns attached to it|


#### `parag`

- Text which user wants to translate to sign language.

#### `translator`

- Wanted Translator ID who will appear in sign language translation video.

#### `enable_translate_letters`

- Flag to return letters of word if the word record was not found in DB.

#### `enable_formation`

- Flag to search words with vocalization characters.

#### `enable_auto_translate`

- Flag to return only one word as translation based on frequency instead of returning array of all matching words.

#### `enable_smart_number_reader`

- Flag to translate Numbers inside paragraphs (Dates / mobile numbers / Numbers).

#### `enable_grammer`

- Flag to translate words and its pronouns attached to it.

#### Example 1 : Translating one word 

```javascript
{
    "parag": "كتاب",
    "translator": 2,
    "enable_translate_letters": 0,
    "enable_formation": 0,
    "enable_auto_translate": 0,
    "enable_smart_number_reader": 0,
    "enable_grammer": 0,
}
```

#### Response
The Response is Array contains multiple arrays based on number of sentences which are seperated when `.` dot was found, and each sentence array contains objects or arrays suggested words that contain objects of occurences of word in DB and the array will only occure when `enable_auto_translate` key was not set or has value of 0.

```javascript
[
    [
        [
            {
                "id": 443,
                "Vocalized": "كِتَابٌ",
                "UnVocalized": "كتاب",
                "Unified": "كتاب",
                "Freq": 9,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/19052.webm",
                "SubjectID": 21,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:10",
                "updated_at": "2024-06-01 18:13:34"
            },
            {
                "id": 2054,
                "Vocalized": "كِتَاب",
                "UnVocalized": "كتاب",
                "Unified": "كتاب",
                "Freq": 4,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/23312.webm",
                "SubjectID": 48,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:11",
                "updated_at": "2024-05-20 02:30:24"
            },
            "NUmOfSuggWords is 2"
        ]
    ]
]
```

#### Example 2 : Translating one sentence with `enable_auto_translate` key is not set

```javascript
{
    "parag": "قرأت الكتاب كامل",
    "translator": 2,
    "enable_translate_letters": 0,
    "enable_formation": 0,
    "enable_auto_translate": 0,
    "enable_smart_number_reader": 0,
    "enable_grammer": 0,
}
```

#### Response
The Response is Array contains multiple arrays based on number of sentences which are seperated when `.` dot was found, and each sentence array contains objects or arrays suggested words that contain objects of occurences of word in DB and the array will only occure when `enable_auto_translate` key was not set or has value of 0.

```javascript
[
    [
        {
            "id": 18921,
            "Vocalized": "قَرَأْتِ",
            "UnVocalized": "قرأت",
            "Is_Female": 1,
            "Is_Plural": 0,
            "Is_Doubled": 0,
            "Freq": 0,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/1515.webm",
            "MainWordID": 250,
            "TenseID": 4,
            "PronounceID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:07:59",
            "updated_at": null
        },
        {
            "id": 443,
            "Vocalized": "كِتَابٌ",
            "UnVocalized": "كتاب",
            "Unified": "كتاب",
            "Freq": 9,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/19052.webm",
            "SubjectID": 21,
            "WordTypeID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:10",
            "updated_at": "2024-06-01 18:13:34"
        },
        [
            {
                "id": 1440,
                "Vocalized": "كَامِل",
                "UnVocalized": "كامل",
                "Unified": "كامل",
                "Freq": 0,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/21051.webm",
                "SubjectID": 48,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:11",
                "updated_at": null
            },
            {
                "id": 2642,
                "Vocalized": "كامِل",
                "UnVocalized": "كامل",
                "Unified": "كامل",
                "Freq": 0,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24074.webm",
                "SubjectID": 48,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:12",
                "updated_at": null
            },
            "NUmOfSuggWords is 2"
        ]
    ]
]
```

#### Example 3 : Translating one sentence with `enable_auto_translate` key is set

```javascript
{
	"parag": "قرأت الكتاب كامل",
    "translator": 2,
    "enable_translate_letters": 0,
    "enable_formation": 0,
    "enable_auto_translate": 1,
    "enable_smart_number_reader": 0,
    "enable_grammer": 0,
}
```

#### Response
The Response is Array contains multiple arrays based on number of sentences which are seperated when `.` dot was found, and each sentence array contains objects or arrays suggested words that contain objects of occurences of word in DB and the array will only occure when `enable_auto_translate` key was not set or has value of 0.

```javascript
[
    [
        {
            "id": 18921,
            "Vocalized": "قَرَأْتِ",
            "UnVocalized": "قرأت",
            "Is_Female": 1,
            "Is_Plural": 0,
            "Is_Doubled": 0,
            "Freq": 1,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/1515.webm",
            "MainWordID": 250,
            "TenseID": 4,
            "PronounceID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:07:59",
            "updated_at": "2024-06-01 18:22:21"
        },
        {
            "id": 443,
            "Vocalized": "كِتَابٌ",
            "UnVocalized": "كتاب",
            "Unified": "كتاب",
            "Freq": 10,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/19052.webm",
            "SubjectID": 21,
            "WordTypeID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:10",
            "updated_at": "2024-06-01 18:22:21"
        },
        {
            "id": 1440,
            "Vocalized": "كَامِل",
            "UnVocalized": "كامل",
            "Unified": "كامل",
            "Freq": 0,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/21051.webm",
            "SubjectID": 48,
            "WordTypeID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:11",
            "updated_at": null
        }
    ]
]
```

#### Example 4 : Translating one sentence with `enable_auto_translate` key is set and `enable_translate_letters` is set and there is one word not found in DB.

```javascript
{
	"parag": "قرأت كتاب محمد",
    "translator": 2,
    "enable_translate_letters": 1,
    "enable_formation": 0,
    "enable_auto_translate": 1,
    "enable_smart_number_reader": 0,
    "enable_grammer": 0,
}
```

#### Response
The Response is Array contains multiple arrays based on number of sentences which are seperated when `.` dot was found, and each sentence array contains objects or arrays
suggested words that contain objects of occurences of word in DB and the array will only occure when `enable_auto_translate` key was not set or has value of 0
another array case is if `enable_translate_letters` key was set and some word was not found then the letters of this word will be returned as objects and thier video links
within this object inside the array of this word.

```javascript
[
    [
        {
            "id": 18921,
            "Vocalized": "قَرَأْتِ",
            "UnVocalized": "قرأت",
            "Is_Female": 1,
            "Is_Plural": 0,
            "Is_Doubled": 0,
            "Freq": 13,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/1515.webm",
            "MainWordID": 250,
            "TenseID": 4,
            "PronounceID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:07:59",
            "updated_at": "2024-06-01 18:39:11"
        },
        {
            "id": 6425,
            "Vocalized": "كِتَاب",
            "UnVocalized": "كتاب",
            "Unified": "كتاب",
            "Freq": 4,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/23312.webm",
            "SubjectID": 48,
            "WordTypeID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-25 15:43:34",
            "updated_at": "2024-05-20 02:30:24"
        },
        [
            {
                "id": 7269,
                "Vocalized": "م",
                "UnVocalized": "م",
                "Unified": "م",
                "Freq": 1128,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24375.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:40:04"
            },
            {
                "id": 7251,
                "Vocalized": "ح",
                "UnVocalized": "ح",
                "Unified": "ح",
                "Freq": 341,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24357.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:40:04"
            },
            {
                "id": 7269,
                "Vocalized": "م",
                "UnVocalized": "م",
                "Unified": "م",
                "Freq": 1129,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24375.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:40:19"
            },
            {
                "id": 7253,
                "Vocalized": "د",
                "UnVocalized": "د",
                "Unified": "د",
                "Freq": 529,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24359.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:40:04"
            }
        ]
    ]
]
```

#### Example 5 : Translating one sentence with `enable_auto_translate` key is set, and `enable_translate_letters` is set and there is one word not found in DB, and `enable_smart_number_reader` is set and there is one Number in the sentence.

```javascript
{
	"parag": "قرأت 210 صفحة من الكتاب",
    "translator": 2,
    "enable_translate_letters": 1,
    "enable_formation": 0,
    "enable_auto_translate": 1,
    "enable_smart_number_reader": 1,
    "enable_grammer": 0,
}
```

#### Response
The Response is Array contains multiple arrays based on number of sentences which are seperated when `.` dot was found, and each sentence array contains objects or arrays
suggested words that contain objects of occurences of word in DB and the array will only occure when `enable_auto_translate` key was not set or has value of 0
another array case is if `enable_translate_letters` key was set and some word was not found then the letters of this word will be returned as objects and thier video links
within this object inside the array of this word.

```javascript
[
    [
        {
            "id": 18921,
            "Vocalized": "قَرَأْتِ",
            "UnVocalized": "قرأت",
            "Is_Female": 1,
            "Is_Plural": 0,
            "Is_Doubled": 0,
            "Freq": 13,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/1515.webm",
            "MainWordID": 250,
            "TenseID": 4,
            "PronounceID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:07:59",
            "updated_at": "2024-06-01 18:39:11"
        },
        [
            {
                "id": 21,
                "Vocalized": "مِائَتَانِ",
                "UnVocalized": "مائتان",
                "Unified": "مائتان",
                "Freq": 1505,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/18439.webm",
                "SubjectID": 1,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:10",
                "updated_at": "2024-05-23 12:09:01"
            },
            {
                "id": 7272,
                "Vocalized": "و",
                "UnVocalized": "و",
                "Unified": "و",
                "Freq": 2129,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24378.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-05-31 23:35:32"
            },
            {
                "id": 4333,
                "Vocalized": "10",
                "UnVocalized": "10",
                "Unified": "10",
                "Freq": 1503,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/18411.webm",
                "SubjectID": 1,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:13",
                "updated_at": "2024-05-23 12:09:02"
            }
        ],
        [
            {
                "id": 7259,
                "Vocalized": "ص",
                "UnVocalized": "ص",
                "Unified": "ص",
                "Freq": 262,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24365.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:04"
            },
            {
                "id": 7265,
                "Vocalized": "ف",
                "UnVocalized": "ف",
                "Unified": "ف",
                "Freq": 202,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24371.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:04"
            },
            {
                "id": 7251,
                "Vocalized": "ح",
                "UnVocalized": "ح",
                "Unified": "ح",
                "Freq": 343,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24357.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:04"
            },
            {
                "id": 7276,
                "Vocalized": "ة",
                "UnVocalized": "ة",
                "Unified": "ه",
                "Freq": 507,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24384.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:04"
            }
        ],
        {
            "id": 8729,
            "Vocalized": "مِن",
            "UnVocalized": "من",
            "Unified": "من",
            "Freq": 0,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/26148.webm",
            "SubjectID": 53,
            "WordTypeID": 4,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-25 15:43:35",
            "updated_at": null
        },
        {
            "id": 443,
            "Vocalized": "كِتَابٌ",
            "UnVocalized": "كتاب",
            "Unified": "كتاب",
            "Freq": 23,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/19052.webm",
            "SubjectID": 21,
            "WordTypeID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:10",
            "updated_at": "2024-06-01 18:47:04"
        }
    ]
]
```

#### Example 6 : Translating one sentence with `enable_auto_translate` key is set, and `enable_translate_letters` is set and there is one word not found in DB, and `enable_smart_number_reader` is not set and there is one Number in the sentence.

```javascript
{
	"parag": "قرأت 210 صفحة من الكتاب",
    "translator": 2,
    "enable_translate_letters": 1,
    "enable_formation": 0,
    "enable_auto_translate": 1,
    "enable_smart_number_reader": 0,
    "enable_grammer": 0,
}
```

#### Response
The Response is Array contains multiple arrays based on number of sentences which are seperated when `.` dot was found, and each sentence array contains objects or arrays
suggested words that contain objects of occurences of word in DB and the array will only occure when `enable_auto_translate` key was not set or has value of 0
another array case is if `enable_translate_letters` key was set and some word was not found then the letters of this word will be returned as objects and thier video links
within this object inside the array of this word.

```javascript
[
    [
        {
            "id": 18921,
            "Vocalized": "قَرَأْتِ",
            "UnVocalized": "قرأت",
            "Is_Female": 1,
            "Is_Plural": 0,
            "Is_Doubled": 0,
            "Freq": 13,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/1515.webm",
            "MainWordID": 250,
            "TenseID": 4,
            "PronounceID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:07:59",
            "updated_at": "2024-06-01 18:39:11"
        },
        [
            {
                "id": 4325,
                "Vocalized": "2",
                "UnVocalized": "2",
                "Unified": "2",
                "Freq": 1595,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/18403.webm",
                "SubjectID": 1,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:13",
                "updated_at": "2024-06-01 15:47:50"
            },
            {
                "id": 4324,
                "Vocalized": "1",
                "UnVocalized": "1",
                "Unified": "1",
                "Freq": 1595,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/18402.webm",
                "SubjectID": 1,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:13",
                "updated_at": "2024-06-01 15:47:50"
            },
            {
                "id": 4323,
                "Vocalized": "0",
                "UnVocalized": "0",
                "Unified": "0",
                "Freq": 1619,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/18401.webm",
                "SubjectID": 1,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:13",
                "updated_at": "2024-06-01 15:47:50"
            }
        ],
        [
            {
                "id": 7259,
                "Vocalized": "ص",
                "UnVocalized": "ص",
                "Unified": "ص",
                "Freq": 263,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24365.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:51"
            },
            {
                "id": 7265,
                "Vocalized": "ف",
                "UnVocalized": "ف",
                "Unified": "ف",
                "Freq": 203,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24371.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:51"
            },
            {
                "id": 7251,
                "Vocalized": "ح",
                "UnVocalized": "ح",
                "Unified": "ح",
                "Freq": 344,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24357.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:51"
            },
            {
                "id": 7276,
                "Vocalized": "ة",
                "UnVocalized": "ة",
                "Unified": "ه",
                "Freq": 508,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/24384.webm",
                "SubjectID": 49,
                "WordTypeID": 12,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-25 15:43:34",
                "updated_at": "2024-06-01 18:47:51"
            }
        ],
        {
            "id": 8729,
            "Vocalized": "مِن",
            "UnVocalized": "من",
            "Unified": "من",
            "Freq": 0,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/26148.webm",
            "SubjectID": 53,
            "WordTypeID": 4,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-25 15:43:35",
            "updated_at": null
        },
        {
            "id": 443,
            "Vocalized": "كِتَابٌ",
            "UnVocalized": "كتاب",
            "Unified": "كتاب",
            "Freq": 24,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/19052.webm",
            "SubjectID": 21,
            "WordTypeID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:10",
            "updated_at": "2024-06-01 18:47:51"
        }
    ]
]
```

#### Example 7 : Translating one sentence with `enable_auto_translate` key is set, and `enable_translate_letters` is set and there is one word not found in DB, and `enable_smart_number_reader` is set and there is one Number in the sentence, and `enable_grammer` is set and there is one word contains pronounce in the sentence.

```javascript
{
	"parag": "لم اعرف اين منزلك",
    "translator": 2,
    "enable_translate_letters": 1,
    "enable_formation": 0,
    "enable_auto_translate": 1,
    "enable_smart_number_reader": 1,
    "enable_grammer": 1,
}
```

#### Response
The Response is Array contains multiple arrays based on number of sentences which are seperated when `.` dot was found, and each sentence array contains objects or arrays
suggested words that contain objects of occurences of word in DB and the array will only occure when `enable_auto_translate` key was not set or has value of 0
another array case is if `enable_translate_letters` key was set and some word was not found then the letters of this word will be returned as objects and thier video links
within this object inside the array of this word.

```javascript
[
    [
        {
            "id": 924,
            "Vocalized": "لَمْ",
            "UnVocalized": "لم",
            "Unified": "لم",
            "Freq": 0,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/19990.webm",
            "SubjectID": 41,
            "WordTypeID": 9,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:11",
            "updated_at": null
        },
        {
            "id": 3328,
            "Vocalized": "أَعْرِف",
            "UnVocalized": "اعرف",
            "Unified": "اعرف",
            "Freq": 1,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/24989.webm",
            "SubjectID": 48,
            "WordTypeID": 1,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:12",
            "updated_at": "2024-06-01 18:57:45"
        },
        {
            "id": 920,
            "Vocalized": "أَيْنَ",
            "UnVocalized": "أين",
            "Unified": "اىن",
            "Freq": 1,
            "Wcode": "https://media.kcgpwdapi.org/media/2/words/19984.webm",
            "SubjectID": 41,
            "WordTypeID": 8,
            "LanguageID": 1,
            "CountryID": 66,
            "SlangID": 1,
            "Created_by": 1,
            "created_at": "2023-12-23 12:25:11",
            "updated_at": "2024-06-01 18:57:45"
        },
        [
            {
                "id": 240,
                "Vocalized": "مَنْزِلٌ",
                "UnVocalized": "منزل",
                "Unified": "منزل",
                "Freq": 0,
                "Wcode": "https://media.kcgpwdapi.org/media/2/words/18738.webm",
                "SubjectID": 16,
                "WordTypeID": 1,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "Created_by": 1,
                "created_at": "2023-12-23 12:25:10",
                "updated_at": null
            },
            {
                "id": 19,
                "pronoun_unvocalized": "ك",
                "Pronoun_Vocalized": "كَ",
                "pronoun_male": "انتَ",
                "pronoun_female": "أنتِ",
                "Wcode": "https://media.kcgpwdapi.org/media/2/pronouns/anta.webm",
                "SubjectID": 52,
                "LanguageID": 1,
                "CountryID": 66,
                "SlangID": 1,
                "created_at": "2024-05-15 11:45:19",
                "updated_at": null
            }
        ]
    ]
]
```



## Authors

This Code, Trademark, and Application is Copywrite protected by law to [Diginovia](https://diginovia.com/)
- Mohammed Waheed [@MuhammadWaheed](https://github.com/MuhammadWaheed73780)

## Links

- [Postman](https://sign-api.postman.co/workspace/Team-Workspace~52915f0a-7bc4-44d9-8e29-9ed4affcb80c/overview)

