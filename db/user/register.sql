insert into users (username, password, balance)
values($(username), $(password), 0)
returning username, profile_pic, id, balance;