show databases; -- 查看所有数据库

use koa2_weibodb; -- 使用某个数据库

DROP DATABASE IF EXISTS koa2_weibodb; -- 删除数据库

use koa2_weibo_db; -- 使用某个数据库

select * from users; -- 查看表中的数据

select username,nickname from users where username='zhangsan' and `password`='123'; -- 查看表中的数据

select username,nickname from users; -- 查看表中的数据

select * from blogs order by id desc; -- 查看表中的数据

insert into users (username,`password`,nickname) values ('zhangsan','123','张三'); -- 插入数据

insert into blogs (title,content,userid) values ('标题A','内容A', 3); -- 插入数据

update blogs set content='内容1内容1' where id='1'; -- 更新数据

delete from blogs where id=3; -- 删除数据

select count(id) as `count` from blogs; -- 统计数据

select * from blogs order by id desc limit 2 offset 2;  -- 分页查询

insert into blogs (title,content,userid) values ('标题5','内容5',2); -- 插入数据

delete from users where id=1; -- 删除数据

select * from blogs inner join users on users.id=blogs.userid; -- 内连接

select blogs.* , users.username, users.nickname 
from blogs inner join users on users.id=blogs.userid
where users.username='zhangsan'; -- 内连接






