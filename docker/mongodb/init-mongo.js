db = db.getSiblingDB("magwishlist");

db.createUser({
  user: "maguser",
  pwd: "magpassword",
  roles: [
    {
      role: "readWrite",
      db: "magwishlist",
    },
  ],
});

db.createCollection("users");
db.createCollection("products");
db.createCollection("wishlists");
db.createCollection("events");
