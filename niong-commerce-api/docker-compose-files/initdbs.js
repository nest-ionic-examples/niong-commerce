db.createUser({
  user: 'niong-commerce-admin',
  pwd: 'password123',
  roles: [{role: 'dbAdmin', db: 'niong-commerce'}]
});
