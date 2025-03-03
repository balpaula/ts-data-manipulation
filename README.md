# TS Data Manipulation
This repository contains the TS Data Manipulation homework.

## Requirements
### Data Structure:
The input JSON will be an array of objects, and each object will represent a "user" with properties such as `id`,
`name`, `email`, `status`, and `tags`. The tags property will be an array of strings, and you need to filter out any
non-string values from this array. On the second page you will find the expected structure. 

**1. Filtering and Validation:**
* The tags property must be filtered to ensure it only contains valid strings. Any non-string
values should be removed.
* If a required field is missing or has an incorrect type, that object should be considered invalid
and removed from the final output.
* Handle any potential parsing errors and edge cases (e.g., missing fields, incorrect types).

**2. Error Handling:**
* When encountering malformed objects, log a detailed error message with the invalid object and
the reason for rejection.
* Implement proper error handling mechanisms.

**3. Transformation:** 
* After filtering and validating the input, transform the array into the correct format by ensuring all
properties match their expected types and values.

## Prerequisites
To install all required dependencies you will require `npm` (or `npx`). Then, run the installing command:

```
npm install
```

## Run the project
To run the data manipulation task, run the following command:

```
npm start
```

### Input data
By default, the project uses the example users JSON data in `tests/testData.json`. You can add your own files and modify the folder and/or file name in the following lines from ìndex.ts:

```js
// Using TEST data from a JSON file
const rawData = fs.readFileSync("./src/tests/testData.json", "utf-8");
```

### Output data
By default, the results will be stored in `results/result.json`. You can modify the output folder and/or file name here in `index.ts`:

```js
// Store the validated & formatted data in a new JSON file
fs.writeFileSync(
  path.join(__dirname, "results", "result.json"),
  JSON.stringify(transformedUsers, null, 2),
  "utf-8"
);
```

## Testing
This project includes [Jest](https://jestjs.io/) unit tests. To run them, use the following command:

```
npm test
```
