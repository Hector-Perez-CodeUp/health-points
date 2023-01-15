"use strict";

//todo: must refresh if you want to change weight goal

$(document).ready(function(){
    $("#disclaimer").modal('show');
});

$("#submit-btn").click(function() {
    // USER METRICS //
    let age = document.querySelector("#age").value;
    let height_unit = $("#height-selector :selected").text();
    let height_value = document.querySelector("#user-height").value;
    let c_weight_unit = $("#c_weight_selector :selected").text();
    let c_weight_value = document.querySelector("#user-current-weight").value;
    let g_weight_unit = $("#g_weight_selector :selected").text();
    let g_weight_value = document.querySelector("#user-goal-weight").value;
    let sex = document.querySelector("#sex :checked").value;
    let act_lvl = document.querySelector("#activityLevel").value;

    // FORMULAS //
    // Calorie Formulas
    let weight_kg;
    c_weight_unit == "lbs" ? weight_kg = c_weight_value * .453592 : weight_kg = c_weight_value; // Convert to kgs
    if (height_unit == "in") {height_value *= 2.54;} // Convert to cm
    let weight_deficit = c_weight_value - g_weight_value;
    let time_to_goal = weight_deficit / 2;
    let bmr = ((10 * weight_kg) + (6.25 * height_value) - (5 * age));
    let bmr_male = (bmr + 5);
    let bmr_female = (bmr - 161);


    // FINAL CALCULATIONS //
    function presentResults(bmrMaleOrFemale, multiplier) {
        let tdee = bmrMaleOrFemale * multiplier;

        // AMDR Formulas
        //Protein: 10-35%
        let pro_low_one = Math.floor(((tdee - 500) * .1) / 4);
        let pro_low_two = Math.floor(((tdee - 1000) * .1) / 4);
        let pro_high_one = Math.floor(((tdee - 500) * .35) / 4);
        let pro_high_two = Math.floor(((tdee - 1000) * .35) / 4);

        //Carbs: 45-65%
        let carb_low_one = Math.floor(((tdee - 500) * .45) / 4);
        let carb_low_two = Math.floor(((tdee - 1000) * .45) / 4);
        let carb_high_one = Math.floor(((tdee - 500) * .65) / 4);
        let carb_high_two = Math.floor(((tdee - 1000) * .65) / 4);

        //Fat: 20-35%
        let fat_low_one = Math.floor(((tdee - 500) * .2) / 9);
        let fat_low_two = Math.floor(((tdee - 1000) * .2) / 9);
        let fat_high_one = Math.floor(((tdee - 500) * .35) / 9);
        let fat_high_two = Math.floor(((tdee - 1000) * .35) / 9);

        // Mild Loss Results
        var oneHTML = (`Losing <strong>1 lb per week</strong>, you should reach your goal in <strong>${weight_deficit} weeks!</strong>\nYou would need to maintain around <u>${Math.floor((tdee - 500))} calories</u> a day.<br>`);
        oneHTML += (`<a class="green" href="https://www.weightwatchers.com/us/blog/food/acceptable-macronutrient-distribution-range" target="_blank">Daily Macronutrient Ranges:  </a>`)
        oneHTML += (`<br><table class="table table-striped"><thead><tr><th>Macro</th><th>Low End</th><th>High End</th></tr></thead>`)
        // Protein Results
        oneHTML += (`<tbody class="table-group-divider"><tr><td><a href="https://www.eufic.org/en/whats-in-food/category/proteins" target="_blank" class="green">Protein</a></td>`)
        oneHTML += (`<td>${pro_low_one} grams</td>`)
        oneHTML += (`<td>${pro_high_one} grams </td></tr>`)
        // Carb Results
        oneHTML += (`<tr><td><a href="https://www.eufic.org/en/whats-in-food/category/carbohydrates" target="_blank" class="green">Carbs</a></td>`)
        oneHTML += (`<td>${carb_low_one} grams</td>`)
        oneHTML += (`<td>${carb_high_one} grams </td>`)
        // Fat Results
        oneHTML += (`<tr><td><a href="https://www.eufic.org/en/whats-in-food/category/dietary-fats" target="_blank" class="green">Fat</a></td>`)
        oneHTML += (`<td>${fat_low_one} grams</td>`)
        oneHTML += (`<td>${fat_high_one} grams </td></tbody></table>`)
        document.querySelector("#one-pound-results").innerHTML = oneHTML;

        // Moderate Loss Results
        var twoHTML = (`Losing <strong>2 lbs per week</strong>, you should reach your goal in <strong>${time_to_goal} weeks!</strong>\nYou would need to maintain around <u>${Math.floor((tdee - 1000))} calories</u> a day.<br>`)
        twoHTML += (`<a class="yellow" href="https://www.weightwatchers.com/us/blog/food/acceptable-macronutrient-distribution-range" target="_blank">Daily Macronutrient Ranges:  </a>`)
        twoHTML += (`<br><table class="table table-striped"><thead><tr><th>Macro</th><th>Low End</th><th>High End</th></tr></thead>`)
        // Protein Results
        twoHTML += (`<tbody><tr><td><a href="https://www.eufic.org/en/whats-in-food/category/proteins" target="_blank" class="yellow">Protein</a></td>`)
        twoHTML += (`<td>${pro_low_two} grams</td>`)
        twoHTML += (`<td>${pro_high_two} grams </td></tr>`)
        // Carb Results
        twoHTML += (`<tr><td><a href="https://www.eufic.org/en/whats-in-food/category/carbohydrates" target="_blank" class="yellow">Carbs</a></td>`)
        twoHTML += (`<td>${carb_low_two} grams</td>`)
        twoHTML += (`<td>${carb_high_two} grams </td>`)
        // Fat Results
        twoHTML += (`<tr><td><a href="https://www.eufic.org/en/whats-in-food/category/dietary-fats" target="_blank" class="yellow">Fat</a></td>`)
        twoHTML += (`<td>${fat_low_two} grams</td>`)
        twoHTML += (`<td>${fat_high_two} grams </td></tbody></table>`)
        document.querySelector("#two-pound-results").innerHTML = twoHTML;
    }

    // Incomplete Data Handling
    if (age == "") {
        alert("Please enter your age");
    } else if (height_value == "") {
        alert("Please enter your height");
    } else if (c_weight_value == "") {
        alert("Please enter your current weight");
    } else if (g_weight_value == "") {
        alert("Please enter your goal weight");
    }else if (act_lvl == "default") {
        alert("Please select your activity level");
    }

    // Male Calculations
    if ( sex == "M" && act_lvl == 1 ) {
        presentResults(bmr_male, 1.2);
    } else if ( sex == "M" && act_lvl == 2) {
        presentResults(bmr_male, 1.375);
    } else if ( sex == "M" && act_lvl == 3) {
        presentResults(bmr_male, 1.55);
    } else if ( sex == "M" && act_lvl == 4) {
        presentResults(bmr_male, 1.725);
    } else if ( sex == "M" && act_lvl == 5) {
        presentResults(bmr_male, 1.9);
    }
    // Female Calculations
    if ( sex == "F" && act_lvl == 1 ) {
        presentResults(bmr_female, 1.2);
    } else if ( sex == "F" && act_lvl == 2) {
        presentResults(bmr_female, 1.375);
    } else if ( sex == "F" && act_lvl == 3) {
        presentResults(bmr_female, 1.55);
    } else if ( sex == "F" && act_lvl == 4) {
        presentResults(bmr_female, 1.725);
    } else if ( sex == "F" && act_lvl == 5) {
        presentResults(bmr_female, 1.9);
    }
})


