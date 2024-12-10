## [Link to ELIZA Chatbot](https://cianmartyn.github.io/emergingtechnology/)


<h2>Task 1: Third-Order Letter Approximation Model</h2> 
I selected five free English works in Plain Text UTF-8 format from Project Gutenberg. After carefully removing any preamble and postamble, I cleaned the text to keep only the following characters: (ASCII) letters (both uppercase and lowercase), full stops, and spaces. I then converted all letters to uppercase for consistency.

Next, I created a trigram model by counting the frequency of each sequence of three consecutive characters (trigrams). I designed a data structure to store these results efficiently, using a dictionary where each trigram is a key and its frequency is the value. This choice allows for quick lookups and easy manipulation of trigram data. For example, given the sentence "It is what it is.", I transformed it to "IT IS WHAT IT IS." and produced a model like {'IT ': 2, 'T I': 3, ' IS': 2, 'IS ': 1, ...}.

<h2>Task 2: Third-Order Letter Approximation Generation</h2>
Using the trigram model I built in Task 1, I generated a string of 10,000 characters. I began the process with the string "TH" and generated each subsequent character by examining the last two characters in the current string. I identified the trigrams in my model that began with those two characters and used the frequencies of the third letters as weights to randomly select the next character.

For instance, if my model contained five trigrams starting with "TH" (e.g., "THE" appeared 150 times, "THA" 70 times, "THI" 60 times, "TH " 50 times, and "TH." 10 times), I calculated the probabilities for selecting the next character as E (150/340), A (70/340), I (60/340), space (50/340), and period (10/340). I repeated this process until the string reached 10,000 characters.

<h2>Task 3: Analyze My Model</h2>
I used the words.txt file from this repository to analyze the generated string. By comparing each word in the 10,000-character string to the list of English words in words.txt, I calculated the percentage of words in my generated text that are valid English words. This provided insight into the quality and accuracy of my model.

<h2>Task 4: Export My Model as JSON</h2>
Finally, I exported the trigram model to a JSON file named trigrams.json and saved it in my repository. This file allows my model to be reused or shared easily for further analysis or integration with other projects.
