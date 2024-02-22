import { WordTokenizer } from "natural";
import * as fs from "fs";
import * as readline from "readline";

class Tokenize {
  async tokenizing_data() {
    // Create a tokenizer instance
    const tokenizer = new WordTokenizer();

    // Function to tokenize a single description
    function tokenizeDescription(description: string): any {
      if (!description) {
        return []; // Return an empty array if description is undefined or empty
      }
      const tokens= tokenizer.tokenize(description);
      return tokens.map(token => token.toLowerCase());
    }

    // Function to process a single line of data
    function processLine(line: string): string[] {
      const [
        ,
        _,
        __,
        ___,
        ____,
        _____,
        ______,
        _______,
        ________,
        _________,
        description,
      ] = line.split(",");
      // Tokenize the description
      const tokens = tokenizeDescription(description);
      return tokens;
    }

    // Function to process the entire dataset file
    async function processDatasetFile(filename: string): Promise<string[][]> {
      const inputStream = fs.createReadStream(
        `/home/appinventiv/Desktop/llm/netflix_titles.csv`
      );
      // console.log("---------->input stream",inputStream)
      const lineReader = readline.createInterface({ input: inputStream });

      const tokensList: string[][] = [];

      for await (const line of lineReader) {
        const tokens = processLine(line);
        tokensList.push(tokens);
      }

      return tokensList;
    }

    // Usage example
    const datasetFilename = "netflix_titles.csv";
    processDatasetFile(datasetFilename)
      .then((tokensList) => {
        // tokensList contains an array of tokenized descriptions for each line in the dataset
        console.log("-------->",tokensList);
      })
      .catch((error) => {
        console.error("Error processing dataset:", error);
      });
  }
}
export const token = new Tokenize();
