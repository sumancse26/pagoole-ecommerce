SET DEFINE OFF;
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (0, 'Worldwide', 'Worldwide', 0, 0, 
    TO_DATE('7/7/2025', 'MM/DD/YYYY'), 0);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (1, 'World Wide', 'World Wide >', 0, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (2, 'Asia ', 'Test Remarks', 1, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (3, 'Africa', 'World Wide > Africa >', 1, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (4, 'North America', 'World Wide > North America >', 1, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (5, 'South America', 'World Wide > South America >', 1, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (6, 'Antarctica', 'World Wide > Antarctica >', 1, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (7, 'Europe', 'World Wide > Europe >', 1, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (8, 'Australia', 'World Wide > Australia >', 1, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (9, 'Kishoregonj', 'World Wide > Asia  > Bangladesh > Dhaka > Kishoregonj >', 24, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (10, 'Bhairab', 'World Wide > Asia  > Bangladesh > Dhaka > Kishoregonj > Bhairab >', 9, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (21, 'Bangladesh', 'World Wide > Asia  > Bangladesh >', 2, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (22, 'India', 'World Wide > Asia  > India >', 2, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (23, 'Mumbai', 'World Wide > Asia  > India > Mumbai >', 22, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (24, 'Dhaka', 'World Wide > Asia  > Bangladesh > Dhaka >', 21, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (25, 'Motijhill', 'World Wide > Asia  > Bangladesh > Dhaka > Motijhill >', 24, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (26, 'Arambag', 'World Wide > Asia  > Bangladesh > Dhaka > Motijhill > Arambag >', 25, 1, 
    TO_DATE('3/15/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (41, 'Pabna', 'Pabna Bangladesh', 24, 1, 
    TO_DATE('3/25/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (61, 'Japan', 'Japan', 2, 1, 
    TO_DATE('4/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (62, 'Tokoyo', 'World Wide > Asia  > Japan > Tokoyo >', 61, 1, 
    TO_DATE('4/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (101, 'uttora', 'World Wide > Asia  > Bangladesh > Dhaka > uttora >', 24, 1, 
    TO_DATE('4/20/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (142, 'cumilla', 'World Wide > Asia  > Bangladesh > Dhaka > cumilla >', 24, 1, 
    TO_DATE('9/18/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (162, 'Tomsom Bridge', 'World Wide > Asia  > Bangladesh > Dhaka > cumilla > Tomsom Bridge >', 142, 1, 
    TO_DATE('9/18/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (201, 'Narshingdi', 'World Wide > Asia  > Bangladesh > Dhaka > Narshingdi >', 24, 1, 
    TO_DATE('9/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (202, 'Srerampur', 'World Wide > Asia  > Bangladesh > Dhaka > Narshingdi > Raipura > Srerampur >', 222, 1, 
    TO_DATE('9/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (203, 'Molvibazar', 'World Wide > Asia  > Bangladesh > Molvibazar >', 21, 1, 
    TO_DATE('9/19/2022', 'MM/DD/YYYY'), 682);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (222, 'Raipura', 'World Wide > Asia  > Bangladesh > Dhaka > Narshingdi > Raipura >', 201, 1, 
    TO_DATE('9/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (223, 'Bajetpur', 'World Wide > Asia  > Bangladesh > Dhaka > Kishoregonj > Bajetpur >', 9, 1, 
    TO_DATE('9/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (224, 'pune', 'World Wide > Asia  > India > pune >', 22, 1, 
    TO_DATE('9/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (241, 'Jogonnathpur', 'World Wide > Asia  > Bangladesh > Dhaka > Kishoregonj > Bhairab > Jogonnathpur >', 10, 1, 
    TO_DATE('9/27/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (242, 'Lukkhmipur', 'World Wide > Asia  > Bangladesh > Dhaka > Kishoregonj > Bhairab > Lukkhmipur >', 10, 1, 
    TO_DATE('9/27/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (261, 'Bajitpur', 'World Wide > Asia  > Bangladesh > Dhaka > Kishoregonj > Bajitpur >', 9, 1, 
    TO_DATE('9/27/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (262, 'Canada', 'World Wide > Europe > canada >', 7, 1, 
    TO_DATE('9/27/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (281, 'New Dellih', 'World Wide > Asia  > India > New Dellih >', 22, 1, 
    TO_DATE('9/27/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (324, 'Gazipur', 'World Wide > Asia  > Bangladesh > Dhaka > Gazipur >', 24, 1, 
    TO_DATE('10/13/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (325, 'Kashimpur', 'World Wide > Asia  > Bangladesh > Dhaka > Gazipur > Kashimpur >', 324, 1, 
    TO_DATE('10/13/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (326, 'Konabari', 'World Wide > Asia  > Bangladesh > Dhaka > Gazipur > Konabari >', 324, 1, 
    TO_DATE('10/13/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (327, 'DBL ', 'World Wide > Asia  > Bangladesh > Dhaka > Gazipur > Konabari > DBL  >', 326, 1, 
    TO_DATE('10/13/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (341, 'Chattagram ', 'World Wide > Asia  > Bangladesh > Chattagram  >', 21, 1, 
    TO_DATE('10/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (361, 'fatickchari', 'World Wide > Asia  > Bangladesh > Chattagram  > fatickchari >', 341, 1, 
    TO_DATE('10/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (362, 'Fakirapul', 'World Wide > Asia  > Bangladesh > Dhaka > Motijhill > Fakirapul >', 25, 1, 
    TO_DATE('10/19/2022', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (384, 'Fiji', 'World Wide > Fiji >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (402, 'Vanuatu', 'World Wide > Vanuatu >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (403, 'Afghanistan', 'World Wide > Afghanistan >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (404, 'Namibia', 'World Wide > Namibia >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (421, 'Indonesia', 'World Wide > Indonesia >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (422, 'Albania', 'World Wide > Albania >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (423, 'Uganda', 'World Wide > Uganda >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (441, 'Bahamas', 'World Wide > Bahamas >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (461, 'British Virgin Islands', 'World Wide > British Virgin Islands >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (481, 'Taiwan', 'World Wide > Taiwan >', 1, 1, 
    TO_DATE('1/8/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (501, 'Nicaragua', 'World Wide > Nicaragua >', 1, 1, 
    TO_DATE('1/9/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (521, 'Barbados', 'World Wide > Barbados >', 1, 1, 
    TO_DATE('1/9/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (541, 'Macau', 'World Wide > Macau >', 1, 1, 
    TO_DATE('1/11/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (561, 'CTG', 'World Wide > CTG >', 1, 1, 
    TO_DATE('1/15/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (581, 'Mymenshing', 'World Wide > Mymenshing >', 1, 1, 
    TO_DATE('1/15/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (601, 'New Zealand', 'World Wide > New Zealand >', 1, 1, 
    TO_DATE('1/23/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (641, 'Algeria', 'Algeria >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (642, 'Angola', 'Angola >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (643, 'Benin', 'Benin >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (644, 'Botswana', 'Botswana >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (645, 'Burkina', 'Burkina >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (646, 'Burundi', 'Burundi >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (647, 'Cameroon', 'Cameroon >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (648, 'Cape Verde', 'Cape Verde >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (649, 'Central African Republic', 'Central African Republic >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (650, 'Chad', 'Chad >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (651, 'Comoros', 'Comoros >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (652, 'Congo', 'Congo >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (653, 'Congo, Democratic Republic of', 'Congo, Democratic Republic of >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (654, 'Djibouti', 'Djibouti >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (655, 'Egypt', 'Egypt >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (656, 'Equatorial Guinea', 'Equatorial Guinea >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (657, 'Eritrea', 'Eritrea >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (658, 'Ethiopia', 'Ethiopia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (659, 'Gabon', 'Gabon >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (660, 'Gambia', 'Gambia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (661, 'Ghana', 'Ghana >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (662, 'Guinea', 'Guinea >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (663, 'Guinea-Bissau', 'Guinea-Bissau >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (664, 'Ivory Coast', 'Ivory Coast >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (665, 'Kenya', 'Kenya >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (666, 'Lesotho', 'Lesotho >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (667, 'Liberia', 'Liberia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (668, 'Libya', 'Libya >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (669, 'Madagascar', 'Madagascar >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (670, 'Malawi', 'Malawi >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (671, 'Mali', 'Mali >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (672, 'Mauritania', 'Mauritania >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (673, 'Mauritius', 'Mauritius >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (674, 'Morocco', 'Morocco >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (675, 'Mozambique', 'Mozambique >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (676, 'Niger', 'Niger >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (677, 'Nigeria', 'Nigeria >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (678, 'Rwanda', 'Rwanda >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (679, 'Sao Tome and Principe', 'Sao Tome and Principe >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (680, 'Senegal', 'Senegal >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (681, 'Seychelles', 'Seychelles >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (682, 'Sierra Leone', 'Sierra Leone >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (683, 'Somalia', 'Somalia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (684, 'South Africa', 'South Africa >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (685, 'South Sudan', 'South Sudan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (686, 'Sudan', 'Sudan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (687, 'Swaziland', 'Swaziland >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (688, 'Tanzania', 'Tanzania >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (689, 'Togo', 'Togo >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (690, 'Tunisia', 'Tunisia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (691, 'Zambia', 'Zambia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (692, 'Zimbabwe', 'Zimbabwe >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (693, 'Bahrain', 'Bahrain >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (694, 'Bhutan', 'Bhutan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (695, 'Brunei', 'Brunei >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (696, 'Burma (Myanmar)', 'Burma (Myanmar) >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (697, 'Cambodia', 'Cambodia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (698, 'China', 'China >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (699, 'East Timor', 'East Timor >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (700, 'Iran', 'Iran >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (701, 'Iraq', 'Iraq >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (702, 'Israel', 'Israel >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (703, 'Jordan', 'Jordan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (704, 'Kazakhstan', 'Kazakhstan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (705, 'Korea, North', 'Korea, North >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (706, 'Korea, South', 'Korea, South >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (707, 'Kuwait', 'Kuwait >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (708, 'Kyrgyzstan', 'Kyrgyzstan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (709, 'Laos', 'Laos >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (710, 'Lebanon', 'Lebanon >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (711, 'Malaysia', 'Malaysia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (712, 'Maldives', 'Maldives >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (713, 'Mongolia', 'Mongolia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (714, 'Nepal', 'Nepal >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (715, 'Oman', 'Oman >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (716, 'Pakistan', 'Pakistan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (717, 'Philippines', 'Philippines >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (718, 'Qatar', 'Qatar >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (719, 'Russian Federation', 'Russian Federation >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (720, 'Saudi Arabia', 'Saudi Arabia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (721, 'Singapore', 'Singapore >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (722, 'Sri Lanka', 'Sri Lanka >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (723, 'Syria', 'Syria >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (724, 'Tajikistan', 'Tajikistan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (725, 'Thailand', 'Thailand >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (726, 'Turkey', 'Turkey >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (727, 'Turkmenistan', 'Turkmenistan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (728, 'United Arab Emirates', 'United Arab Emirates >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (729, 'Uzbekistan', 'Uzbekistan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (730, 'Vietnam', 'Vietnam >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (731, 'Yemen', 'Yemen >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (732, 'Andorra', 'Andorra >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (733, 'Armenia', 'Armenia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (734, 'Austria', 'Austria >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (735, 'Azerbaijan', 'Azerbaijan >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (736, 'Belarus', 'Belarus >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (737, 'Belgium', 'Belgium >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (738, 'Bosnia and Herzegovina', 'Bosnia and Herzegovina >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (739, 'Bulgaria', 'Bulgaria >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (740, 'Croatia', 'Croatia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (741, 'Cyprus', 'Cyprus >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (742, 'CZ', 'CZ >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (743, 'Denmark', 'Denmark >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (744, 'Estonia', 'Estonia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (745, 'Finland', 'Finland >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (746, 'France', 'France >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (747, 'Georgia', 'Georgia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (748, 'Germany', 'Germany >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (749, 'Greece', 'Greece >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (750, 'Hungary', 'Hungary >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (751, 'Iceland', 'Iceland >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (752, 'Ireland', 'Ireland >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (753, 'Italy', 'Italy >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (754, 'Latvia', 'Latvia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (755, 'Liechtenstein', 'Liechtenstein >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (756, 'Lithuania', 'Lithuania >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (757, 'Luxembourg', 'Luxembourg >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (758, 'Macedonia', 'Macedonia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (759, 'Malta', 'Malta >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (760, 'Moldova', 'Moldova >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (761, 'Monaco', 'Monaco >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (762, 'Montenegro', 'Montenegro >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (763, 'Netherlands', 'Netherlands >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (764, 'Norway', 'Norway >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (765, 'Poland', 'Poland >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (766, 'Portugal', 'Portugal >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (767, 'Romania', 'Romania >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (768, 'San Marino', 'San Marino >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (769, 'Serbia', 'Serbia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (770, 'Slovakia', 'Slovakia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (771, 'Slovenia', 'Slovenia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (772, 'Spain', 'Spain >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (773, 'Sweden', 'Sweden >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (774, 'Switzerland', 'Switzerland >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (775, 'Ukraine', 'Ukraine >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (776, 'United Kingdom', 'United Kingdom >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (777, 'Vatican City', 'Vatican City >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (778, 'Antigua and Barbuda', 'Antigua and Barbuda >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (779, 'Belize', 'Belize >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (780, 'Costa Rica', 'Costa Rica >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (781, 'Cuba', 'Cuba >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (782, 'Dominica', 'Dominica >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (783, 'Dominican Republic', 'Dominican Republic >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (784, 'El Salvador', 'El Salvador >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (785, 'Grenada', 'Grenada >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (786, 'Guatemala', 'Guatemala >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (787, 'Haiti', 'Haiti >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (788, 'Honduras', 'Honduras >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (789, 'Jamaica', 'Jamaica >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (790, 'Mexico', 'Mexico >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (791, 'Panama', 'Panama >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (792, 'Saint Kitts and Nevis', 'Saint Kitts and Nevis >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (793, 'Saint Lucia', 'Saint Lucia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (794, 'Saint Vincent and the Grenadines', 'Saint Vincent and the Grenadines >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (795, 'Trinidad and Tobago', 'Trinidad and Tobago >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (796, 'US', 'US >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (797, 'Kiribati', 'Kiribati >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (798, 'Marshall Islands', 'Marshall Islands >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (799, 'Micronesia', 'Micronesia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (800, 'Nauru', 'Nauru >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (801, 'Palau', 'Palau >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (802, 'Papua New Guinea', 'Papua New Guinea >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (803, 'Samoa', 'Samoa >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (804, 'Solomon Islands', 'Solomon Islands >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (805, 'Tonga', 'Tonga >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (806, 'Tuvalu', 'Tuvalu >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (807, 'Argentina', 'Argentina >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (808, 'Bolivia', 'Bolivia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (809, 'Brazil', 'Brazil >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (810, 'Chile', 'Chile >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (811, 'Colombia', 'Colombia >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (812, 'Ecuador', 'Ecuador >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (813, 'Guyana', 'Guyana >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (814, 'Paraguay', 'Paraguay >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (815, 'Peru', 'Peru >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (816, 'Suriname', 'Suriname >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (817, 'Uruguay', 'Uruguay >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, FULL_ADDRESS, PARENT_ID, IS_ACTIVE, 
    ENTRY_DATE, CREATED_BY)
 Values
   (818, 'Venezuela', 'Venezuela >', 1, 1, 
    TO_DATE('1/28/2023', 'MM/DD/YYYY'), 1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, PARENT_ID, IS_ACTIVE, ENTRY_DATE, 
    CREATED_BY)
 Values
   (841, 'Salna', 324, 1, TO_DATE('5/13/2023', 'MM/DD/YYYY'), 
    1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, PARENT_ID, IS_ACTIVE, ENTRY_DATE, 
    CREATED_BY)
 Values
   (861, 'Gulshan', 24, 1, TO_DATE('5/21/2023', 'MM/DD/YYYY'), 
    1062);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, PARENT_ID, IS_ACTIVE, ENTRY_DATE, 
    CREATED_BY)
 Values
   (881, 'DBL Group', 325, 1, TO_DATE('7/10/2023', 'MM/DD/YYYY'), 
    1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, PARENT_ID, IS_ACTIVE, ENTRY_DATE, 
    CREATED_BY)
 Values
   (901, 'Sosur Bari', 202, 1, TO_DATE('8/27/2023', 'MM/DD/YYYY'), 
    1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, PARENT_ID, IS_ACTIVE, ENTRY_DATE, 
    CREATED_BY)
 Values
   (921, 'Utholia', 162, 1, TO_DATE('11/27/2023', 'MM/DD/YYYY'), 
    1);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, PARENT_ID, IS_ACTIVE, ENTRY_DATE, 
    CREATED_BY)
 Values
   (941, 'sda', 201, 1, TO_DATE('1/2/2024', 'MM/DD/YYYY'), 
    2081);
Insert into TAHQIQ.TEST_DATA
   (ID, NAME, PARENT_ID, IS_ACTIVE, ENTRY_DATE, 
    CREATED_BY)
 Values
   (961, 'Stadium Market.', 25, 1, TO_DATE('3/22/2024', 'MM/DD/YYYY'), 
    1);
COMMIT;
