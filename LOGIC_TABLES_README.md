# Logic Tables -- Nutrition, Body-Fat Recommendation & Pre-Report System

Comprehensive logic documentation for the AI‑powered fitness & nutrition
backend.

------------------------------------------------------------------------

# 1. Body‑Fat Recommendation Logic (`getRecommendationByBodyFat`)

The system evaluates whether a user's selected goal (cut / bulk /
general health) is appropriate based on gender‑specific body‑fat limits.

## Body‑Fat Thresholds

  Gender   cutLow   bulkHigh
  -------- -------- ----------
  Male     7%       22%
  Female   14%      35%

------------------------------------------------------------------------

## Logic Table

  ------------------------------------------------------------------------------------------------------------------------------
  \#   Goal      Gender   Condition              dangerZone   isRecommended   isHealthTargetAndLowCalo   Level   Message
  ---- --------- -------- ---------------------- ------------ --------------- -------------------------- ------- ---------------
  1    Cut       Male     bodyFat \< 7%          true         false           null                       NOT OK  Body fat too
                                                                                                                 low for
                                                                                                                 cutting. Avoid
                                                                                                                 cutting.

  2    Mass      Male     bodyFat \> 22%         true         false           null                       NOT OK  Body fat too
                                                                                                                 high for
                                                                                                                 effective
                                                                                                                 bulking. Prefer
                                                                                                                 stabilization
                                                                                                                 or mild cut.

  3    Cut       Female   bodyFat \< 14%         true         false           null                       NOT OK  Body fat too
                                                                                                                 low for
                                                                                                                 cutting. Avoid
                                                                                                                 cutting.

  4    Mass      Female   bodyFat \> 35%         true         false           null                       NOT OK  Body fat too
                                                                                                                 high for
                                                                                                                 optimal
                                                                                                                 bulking. Prefer
                                                                                                                 mild cut first.

  5    General   Male     bodyFat \> 22%         true         false           false                      NOT OK  High body fat.
       Health                                                                                                    Consider mild
                                                                                                                 caloric
                                                                                                                 deficit.

  6    General   Male     bodyFat \< 7%          true         false           true                       NOT OK  Very low body
       Health                                                                                                    fat. Consider
                                                                                                                 slight caloric
                                                                                                                 surplus.

  7    General   Female   bodyFat \> 35%         true         false           false                      NOT OK  High body fat.
       Health                                                                                                    Consider
                                                                                                                 deficit focus.

  8    General   Female   bodyFat \< 14%         true         false           true                       NOT OK  Very low body
       Health                                                                                                    fat. Consider
                                                                                                                 slight caloric
                                                                                                                 surplus.

  9    Any Goal  Any      No danger conditions   false        true            null                       OK      Goal is
                          met                                                                                    appropriate for
                                                                                                                 current
                                                                                                                 body‑fat
                                                                                                                 levels.
  ------------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

# 2. Pre‑Report Logic (`buildPreReport`)

Determines what structured, deterministic report is generated *before*
sending anything to AI.

## Pre‑Report Output Fields

-   **proteinIntake**: text explaining daily protein requirement\
-   **caloriIntake**: text explaining calorie target\
-   **intention**: strategic guidance (optional)\
-   **effectiveTarget**: revised target if user's selected goal is
    unsafe

------------------------------------------------------------------------

## Logic Table

  ----------------------------------------------------------------------------------------------------------
  \#   Goal      dangerZone   isHealthTargetAndLowCalo   Calorie Logic   effectiveTarget   Description
  ---- --------- ------------ -------------------------- --------------- ----------------- -----------------
  1    Mass /    false        n/a                        Use             Same as goal      Safe state:
       Cut                                               TDEE‑adjusted                     standard protein
                                                         calorie target                    and calorie
                                                                                           instructions.

  2    General   true         false                      Apply caloric   General Health    For high body
       Health                                            deficit (TDEE −                   fat: recommend
                                                         500)                              mild deficit.

  3    General   true         true                       Apply caloric   General Health    For very low body
       Health                                            surplus (TDEE +                   fat: recommend
                                                         500)                              slight surplus.

  4    Cut       true         n/a                        Raise calories  "Muscle Gain /    Cutting unsafe
                                                         (TDEE + 500)    Stabilization"    due to low
                                                                                           calories → raise
                                                                                           intake.

  5    Mass      true         n/a                        Reduce calories "Mild Cut /       Bulking unsafe at
                                                         to TDEE         Stabilization"    high BF → revert
                                                                                           to maintenance.

  6    Any       false        n/a                        Default calorie Same as goal      No special case →
                                                         text                              return basic
                                                                                           protein/calorie
                                                                                           text.
  ----------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

# 3. Profile Creation Logic Flow (`POST /Create-profile`)

  ----------------------------------------------------------------------------
  Step               Action                   Details
  ------------------ ------------------------ --------------------------------
  1                  Validate input           Joi validation → errors return
                                              400

  2                  Extract data             gender, weight, height, age,
                                              activity, target, bodyFat

  3                  Compute BMR              Using Mifflin‑St Jeor

  4                  Compute TDEE             Based on activity level

  5                  Compute protein          `proteinIntakeCulc()`

  6                  Evaluate body‑fat state  `getRecommendationByBodyFat()`

  7                  Compute calorie target   `dailyCalorieIntake()`

  8                  Build pre‑report         `buildPreReport()`

  9                  Save profile             Save all calculations into
                                              MongoDB

  10                 Build AI input           `profileForAI` structure

  11                 Run AI                   `buildReport()` with pre‑prompt
                                              safety layer

  12                 Respond to client        Returns stored profile,
                                              pre‑report, and AI report
  ----------------------------------------------------------------------------

------------------------------------------------------------------------

# 4. Pre‑Prompt Safety Layer (AI Constraints)

To ensure AI does *not* override server logic:

  -----------------------------------------------------------------------
  Rule                   Description
  ---------------------- ------------------------------------------------
  Prevent BMR            AI must use server‑computed BMR
  recalculation          

  Prevent TDEE           AI must use server TDEE
  recalculation          

  Fixed calorie and      Only those computed server‑side allowed
  protein values         

  Use danger flags       AI receives: dangerZone, low/high calories,
                         mismatch flags

  No extreme             AI prohibited from unsafe caloric suggestions
  recommendations        

  Standardized Markdown  AI outputs consistent sections
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 5. Nutrition Calculation Rules

  Metric                     Formula / Logic
  -------------------------- -----------------------------------------
  BMR                        Mifflin‑St Jeor (gender‑specific)
  TDEE                       BMR × activity factor
  Protein (health)           weight × 1.6
  Protein (cut)              weight × 2.2
  Protein (mass)             weight × 2.0
  Calorie target -- cut      TDEE − 500
  Calorie target -- mass     TDEE + 500
  Calorie target -- health   TDEE (unless danger zone logic applies)

------------------------------------------------------------------------

This file provides a full logic specification for maintainers,
reviewers, and AI‑aligned systems.
