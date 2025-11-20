SET client_min_messages TO WARNING;

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (0, 'Worldwide', 'Worldwide', NULL, 0,
    '2025-07-07 00:00:00'::timestamp, '2025-07-07 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (1, 'World Wide', 'World Wide >', 0, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (2, 'Asia ', 'Test Remarks', 1, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (3, 'Africa', 'World Wide > Africa >', 1, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (4, 'North America', 'World Wide > North America >', 1, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (5, 'South America', 'World Wide > South America >', 1, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (6, 'Antarctica', 'World Wide > Antarctica >', 1, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (7, 'Europe', 'World Wide > Europe >', 1, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (8, 'Australia', 'World Wide > Australia >', 1, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (21, 'Bangladesh', 'World Wide > Asia > Bangladesh >', 2, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (22, 'India', 'World Wide > Asia > India >', 2, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (23, 'Mumbai', 'World Wide > Asia > India > Mumbai >', 22, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (24, 'Dhaka', 'World Wide > Asia > Bangladesh > Dhaka >', 21, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (9, 'Kishoregonj', 'World Wide > Asia > Bangladesh > Dhaka > Kishoregonj >', 24, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (10, 'Bhairab', 'World Wide > Asia > Bangladesh > Dhaka > Kishoregonj > Bhairab >', 9, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (25, 'Motijhill', 'World Wide > Asia > Bangladesh > Dhaka > Motijhill >', 24, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (26, 'Arambag', 'World Wide > Asia > Bangladesh > Dhaka > Motijhill > Arambag >', 25, 1,
    '2022-03-15 00:00:00'::timestamp, '2022-03-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (41, 'Pabna', 'Pabna Bangladesh', 24, 1,
    '2022-03-25 00:00:00'::timestamp, '2022-03-25 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (61, 'Japan', 'Japan', 2, 1,
    '2022-04-19 00:00:00'::timestamp, '2022-04-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (62, 'Tokoyo', 'World Wide > Asia > Japan > Tokoyo >', 61, 1,
    '2022-04-19 00:00:00'::timestamp, '2022-04-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (101, 'uttora', 'World Wide > Asia > Bangladesh > Dhaka > uttora >', 24, 1,
    '2022-04-20 00:00:00'::timestamp, '2022-04-20 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (142, 'cumilla', 'World Wide > Asia > Bangladesh > Dhaka > cumilla >', 24, 1,
    '2022-09-18 00:00:00'::timestamp, '2022-09-18 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (162, 'Tomsom Bridge', 'World Wide > Asia > Bangladesh > Dhaka > cumilla > Tomsom Bridge >', 142, 1,
    '2022-09-18 00:00:00'::timestamp, '2022-09-18 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (201, 'Narshingdi', 'World Wide > Asia > Bangladesh > Dhaka > Narshingdi >', 24, 1,
    '2022-09-19 00:00:00'::timestamp, '2022-09-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (203, 'Molvibazar', 'World Wide > Asia > Bangladesh > Molvibazar >', 21, 1,
    '2022-09-19 00:00:00'::timestamp, '2022-09-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (222, 'Raipura', 'World Wide > Asia > Bangladesh > Dhaka > Narshingdi > Raipura >', 201, 1,
    '2022-09-19 00:00:00'::timestamp, '2022-09-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (202, 'Srerampur', 'World Wide > Asia > Bangladesh > Dhaka > Narshingdi > Raipura > Srerampur >', 222, 1,
    '2022-09-19 00:00:00'::timestamp, '2022-09-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (223, 'Bajetpur', 'World Wide > Asia > Bangladesh > Dhaka > Kishoregonj > Bajetpur >', 9, 1,
    '2022-09-19 00:00:00'::timestamp, '2022-09-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (224, 'pune', 'World Wide > Asia > India > pune >', 22, 1,
    '2022-09-19 00:00:00'::timestamp, '2022-09-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (241, 'Jogonnathpur', 'World Wide > Asia > Bangladesh > Dhaka > Kishoregonj > Bhairab > Jogonnathpur >', 10, 1,
    '2022-09-27 00:00:00'::timestamp, '2022-09-27 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (242, 'Lukkhmipur', 'World Wide > Asia > Bangladesh > Dhaka > Kishoregonj > Bhairab > Lukkhmipur >', 10, 1,
    '2022-09-27 00:00:00'::timestamp, '2022-09-27 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (261, 'Bajitpur', 'World Wide > Asia > Bangladesh > Dhaka > Kishoregonj > Bajitpur >', 9, 1,
    '2022-09-27 00:00:00'::timestamp, '2022-09-27 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (262, 'Canada', 'World Wide > Europe > canada >', 7, 1,
    '2022-09-27 00:00:00'::timestamp, '2022-09-27 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (281, 'New Dellih', 'World Wide > Asia > India > New Dellih >', 22, 1,
    '2022-09-27 00:00:00'::timestamp, '2022-09-27 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (324, 'Gazipur', 'World Wide > Asia > Bangladesh > Dhaka > Gazipur >', 24, 1,
    '2022-10-13 00:00:00'::timestamp, '2022-10-13 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (325, 'Kashimpur', 'World Wide > Asia > Bangladesh > Dhaka > Gazipur > Kashimpur >', 324, 1,
    '2022-10-13 00:00:00'::timestamp, '2022-10-13 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (326, 'Konabari', 'World Wide > Asia > Bangladesh > Dhaka > Gazipur > Konabari >', 324, 1,
    '2022-10-13 00:00:00'::timestamp, '2022-10-13 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (327, 'DBL ', 'World Wide > Asia > Bangladesh > Dhaka > Gazipur > Konabari > DBL >', 326, 1,
    '2022-10-13 00:00:00'::timestamp, '2022-10-13 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (341, 'Chattagram ', 'World Wide > Asia > Bangladesh > Chattagram >', 21, 1,
    '2022-10-19 00:00:00'::timestamp, '2022-10-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (361, 'fatickchari', 'World Wide > Asia > Bangladesh > Chattagram > fatickchari >', 341, 1,
    '2022-10-19 00:00:00'::timestamp, '2022-10-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (362, 'Fakirapul', 'World Wide > Asia > Bangladesh > Dhaka > Motijhill > Fakirapul >', 25, 1,
    '2022-10-19 00:00:00'::timestamp, '2022-10-19 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (384, 'Fiji', 'World Wide > Fiji >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (402, 'Vanuatu', 'World Wide > Vanuatu >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (403, 'Afghanistan', 'World Wide > Afghanistan >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (404, 'Namibia', 'World Wide > Namibia >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (421, 'Indonesia', 'World Wide > Indonesia >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (422, 'Albania', 'World Wide > Albania >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (423, 'Uganda', 'World Wide > Uganda >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (441, 'Bahamas', 'World Wide > Bahamas >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (461, 'British Virgin Islands', 'World Wide > British Virgin Islands >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (481, 'Taiwan', 'World Wide > Taiwan >', 1, 1,
    '2023-01-08 00:00:00'::timestamp, '2023-01-08 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (501, 'Nicaragua', 'World Wide > Nicaragua >', 1, 1,
    '2023-01-09 00:00:00'::timestamp, '2023-01-09 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (521, 'Barbados', 'World Wide > Barbados >', 1, 1,
    '2023-01-09 00:00:00'::timestamp, '2023-01-09 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (541, 'Macau', 'World Wide > Macau >', 1, 1,
    '2023-01-11 00:00:00'::timestamp, '2023-01-11 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (561, 'CTG', 'World Wide > CTG >', 1, 1,
    '2023-01-15 00:00:00'::timestamp, '2023-01-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (581, 'Mymenshing', 'World Wide > Mymenshing >', 1, 1,
    '2023-01-15 00:00:00'::timestamp, '2023-01-15 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (601, 'New Zealand', 'World Wide > New Zealand >', 1, 1,
    '2023-01-23 00:00:00'::timestamp, '2023-01-23 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (641, 'Algeria', 'Algeria >', 1, 1,
    '2023-01-28 00:00:00'::timestamp, '2023-01-28 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (642, 'Angola', 'Angola >', 1, 1,
    '2023-01-28 00:00:00'::timestamp, '2023-01-28 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (643, 'Benin', 'Benin >', 1, 1,
    '2023-01-28 00:00:00'::timestamp, '2023-01-28 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (644, 'Botswana', 'Botswana >', 1, 1,
    '2023-01-28 00:00:00'::timestamp, '2023-01-28 00:00:00'::timestamp);

INSERT INTO discountshop."Geo_Locations"
   (id, name, full_address, parent_id, is_active,
    entry_date, updated_at)
VALUES
   (645, 'Burkina', 'Burkina >', 1, 1,
    '2023-01-28 00:00:00'::timestamp, '2023-01-28 00:00:00'::timestamp);