/* Formatted on 8/10/2025 3:53:52 PM (QP5 v5.374) */
CREATE OR REPLACE PROCEDURE DISCOUNT_SHOP.PROC_SET_DEFAULT_VALUE_CATEGORIES
IS
BEGIN
    DELETE FROM DISCOUNT_SHOP.CATEGORIES;

    -- Insert default 'No' category with ID 0 and PARENT_ID NULL
    INSERT INTO DISCOUNT_SHOP.CATEGORIES (ID,
                                          CATEGORY_NAME,
                                          ORDER_BY,
                                          PARENT_ID,
                                          IS_ACTIVE)
         VALUES (0,
                 'No',
                 0,
                 NULL,
                 1);

    -- Insert top-level categories with PARENT_ID = NULL
    INSERT INTO DISCOUNT_SHOP.CATEGORIES (ID,
                                          CATEGORY_NAME,
                                          ORDER_BY,
                                          PARENT_ID,
                                          IS_ACTIVE)
        SELECT ID,
               CATEGORY_NAME,
               ORDER_BY,
               0,
               1
          FROM (SELECT 1                   AS ID,
                       'Fresh Produce'     AS CATEGORY_NAME,
                       1                   AS ORDER_BY
                  FROM DUAL
                UNION ALL
                SELECT 2, 'Dairy & Eggs', 2 FROM DUAL
                UNION ALL
                SELECT 3, 'Bakery', 3 FROM DUAL
                UNION ALL
                SELECT 4, 'Beverages', 4 FROM DUAL
                UNION ALL
                SELECT 5, 'Snacks & Confectionery', 5 FROM DUAL
                UNION ALL
                SELECT 6, 'Meat & Seafood', 6 FROM DUAL
                UNION ALL
                SELECT 7, 'Pantry Staples', 7 FROM DUAL
                UNION ALL
                SELECT 8, 'Frozen Foods', 8 FROM DUAL
                UNION ALL
                SELECT 9, 'Household & Cleaning', 9 FROM DUAL
                UNION ALL
                SELECT 10, 'Personal Care', 10 FROM DUAL);

    -- Insert Fresh Produce children with PARENT_ID = 1
    INSERT INTO DISCOUNT_SHOP.CATEGORIES (ID,
                                          CATEGORY_NAME,
                                          ORDER_BY,
                                          PARENT_ID,
                                          IS_ACTIVE)
        SELECT ID,
               CATEGORY_NAME,
               ORDER_BY,
               1,
               1
          FROM (SELECT 11 AS ID, 'Fruits' AS CATEGORY_NAME, 1 AS ORDER_BY
                  FROM DUAL
                UNION ALL
                SELECT 12, 'Vegetables', 2 FROM DUAL
                UNION ALL
                SELECT 13, 'Organic Produce', 3 FROM DUAL);

    -- Insert Dairy & Eggs children with PARENT_ID = 2
    INSERT INTO DISCOUNT_SHOP.CATEGORIES (ID,
                                          CATEGORY_NAME,
                                          ORDER_BY,
                                          PARENT_ID,
                                          IS_ACTIVE)
        SELECT ID,
               CATEGORY_NAME,
               ORDER_BY,
               2,
               1
          FROM (SELECT 14 AS ID, 'Milk' AS CATEGORY_NAME, 1 AS ORDER_BY
                  FROM DUAL
                UNION ALL
                SELECT 15, 'Cheese', 2 FROM DUAL
                UNION ALL
                SELECT 16, 'Butter & Cream', 3 FROM DUAL
                UNION ALL
                SELECT 17, 'Eggs', 4 FROM DUAL);

    -- Insert Bakery children with PARENT_ID = 3
    INSERT INTO DISCOUNT_SHOP.CATEGORIES (ID,
                                          CATEGORY_NAME,
                                          ORDER_BY,
                                          PARENT_ID,
                                          IS_ACTIVE)
        SELECT ID,
               CATEGORY_NAME,
               ORDER_BY,
               3,
               1
          FROM (SELECT 18                   AS ID,
                       'Breads & Rolls'     AS CATEGORY_NAME,
                       1                    AS ORDER_BY
                  FROM DUAL
                UNION ALL
                SELECT 19, 'Cakes & Pastries', 2 FROM DUAL
                UNION ALL
                SELECT 20, 'Cookies & Biscuits', 3 FROM DUAL);

    -- Insert Beverages children with PARENT_ID = 4
    INSERT INTO DISCOUNT_SHOP.CATEGORIES (ID,
                                          CATEGORY_NAME,
                                          ORDER_BY,
                                          PARENT_ID,
                                          IS_ACTIVE)
        SELECT ID,
               CATEGORY_NAME,
               ORDER_BY,
               4,
               1
          FROM (SELECT 21                            AS ID,
                       'Water & Sparkling Water'     AS CATEGORY_NAME,
                       1                             AS ORDER_BY
                  FROM DUAL
                UNION ALL
                SELECT 22, 'Soft Drinks', 2 FROM DUAL
                UNION ALL
                SELECT 23, 'Juices', 3 FROM DUAL
                UNION ALL
                SELECT 24, 'Tea & Coffee', 4 FROM DUAL
                UNION ALL
                SELECT 25, 'Energy Drinks', 5 FROM DUAL);

    COMMIT;
    DBMS_OUTPUT.PUT_LINE ('Categories with IDs inserted successfully.');
EXCEPTION
    WHEN OTHERS
    THEN
        DISCOUNT_SHOP.ALL_INS_ERROR_LOG (p_code      => SQLCODE,
                                         p_message   => SQLERRM,
                                         p_app_id    => -1,
                                         p_page_id   => -1,
                                         p_user      => USER);
        ROLLBACK;
END PROC_SET_DEFAULT_VALUE_CATEGORIES;
/

/* Formatted on 8/10/2025 3:54:09 PM (QP5 v5.374) */
EXEC DISCOUNT_SHOP.PROC_SET_DEFAULT_VALUE_CATEGORIES;
/

           SELECT LPAD ('-', 2 * (LEVEL - 1)) || CATEGORY_NAME    AS category_hierarchy,
                  ID,
                  PARENT_ID,
                  LEVEL
             FROM DISCOUNT_SHOP.CATEGORIES
       START WITH PARENT_ID = 0
       CONNECT BY PRIOR ID = PARENT_ID
ORDER SIBLINGS BY CATEGORY_NAME;
/