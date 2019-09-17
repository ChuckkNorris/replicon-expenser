# Replicon Auto-Expenser

Take pictures of your receipts, name them in a specific format, then execute this script to automatically create, fill out, and save your expense sheet in Replicon.

# Steps to Run

1. Install NodeJS
2. Install Dependencies

   `npm install`

3. Name your expenses and put them in a folder:

   ```
   2019-09-06_Meal_Dinner_Elways_$13.22.png
   YYYY-MM-DD_{MealType}_{Purpose}_{Place}_{Amount}.png
   MealTypes = ['Travel', 'Meal', 'Training']
   ```

4. Create the expense report

   `npm start "myemail@credera.com" "MyPassword" "./path/to/receipts/folder" "Expense Description" "Client Name" "Project Name"`

   Script requires Credera account username/password, path to receipts folder, description for expense report, client name, and project name. Can input substring of client name and project name. If there are multiple clients/projects that match the input substring, the first will be selected
