UPDATE "public"."Picross"
SET "rowCount" = jsonb_array_length(rows), "colCount" = jsonb_array_length(cols);