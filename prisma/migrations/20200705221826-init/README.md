# Migration `20200705221826-init`

This migration has been generated at 7/5/2020, 10:18:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"name" text  NOT NULL ,"password" text  NOT NULL ,"phoneNumber" text  NOT NULL ,"rollNumber" text   ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Shop" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"name" text  NOT NULL ,"password" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Item" (
"description" text  NOT NULL ,"id" text  NOT NULL ,"imageUrl" text  NOT NULL ,"isAvailable" boolean  NOT NULL ,"name" text  NOT NULL ,"price" text  NOT NULL ,"quantity" text  NOT NULL ,"shopId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Purchase" (
"amount" text  NOT NULL ,"id" text  NOT NULL ,"isPaid" boolean  NOT NULL ,"itemId" text  NOT NULL ,"quantity" text  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."Item" ADD FOREIGN KEY ("shopId")REFERENCES "public"."Shop"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Purchase" ADD FOREIGN KEY ("itemId")REFERENCES "public"."Item"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Purchase" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200705221826-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,54 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id                String      @default(cuid()) @id
+  name              String    
+  email             String
+  rollNumber        String?
+  phoneNumber       String  
+  password          String
+  purchase          Purchase[]  @relation("PurchasedBy")
+}
+
+model Shop {
+  id          String      @default(cuid()) @id
+  name        String
+  email       String
+  password    String
+  items       Item[]      @relation("ShopItems")
+}
+
+model Item {
+  id          String      @default(cuid()) @id
+  imageUrl    String
+  name        String
+  quantity    String   
+  description String     
+  price       String
+  shop        Shop        @relation("ShopItems", references:[id], fields: [shopId])
+  shopId      String
+  isAvailable Boolean
+  purchases   Purchase[]  @relation("ItemPurchases")
+}
+
+model Purchase {
+  id          String      @default(cuid()) @id
+  item        Item        @relation("ItemPurchases", references: [id], fields: [itemId])
+  itemId      String      
+  isPaid      Boolean
+  amount      String
+  quantity    String
+  user        User        @relation("PurchasedBy", references: [id], fields: [userId])
+  userId      String
+}
+
```


