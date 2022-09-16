db.createUser({
  user: 'niong-commerce-admin',
  pwd: 'password123',
  roles: [{role: 'dbAdmin', db: 'niong-commerce'}]
});

db.users.insert([{
  role: "ADMIN",
  username: "admin",
  email: "admin@test.com",
  lastName: "admin_last",
  firstName: "admin_first",
  password: "$2b$10$28NHgvf49ZW5PpjzI7L9Hu/lxpf6yzVE6Nmn14ax0O7X6Ew4RBiY2",
  created: ISODate("2019-06-28T21:23:24.659Z"),
  enabled: true,
  deleted: false,
  loggedIn: true
}, {
  role: "SELLER",
  username: "seller",
  email: "seller@test.com",
  lastName: "seller_last",
  firstName: "seller_first",
  password: "$2b$10$Jt9GXITDedZySEZeWu70k.ssfi34wSkdDAdy5Jw/Q/F3spSJuW3NG",
  created: ISODate("2019-06-28T21:51:31.087Z"),
  enabled: true,
  deleted: false,
  loggedIn: true
}]);

for (let i = 0; i < 40; i++) {
  db.products.insert(
    {title: `Product ${i}`, description: `Product ${i} Description`, price: 100}
  )
}
