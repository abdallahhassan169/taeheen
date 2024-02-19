 
  
return  with recursive all_mang as
  ( select users.id , users.user_name ,users.manager_id 
							from "Test".users users 
							where users.id = 3
							union all 
						   select u.id , u.user_name,u.manager_id  
							from "Test".users u 
							join all_mang on all_mang.manager_id = u.id
						   ) select * , 1 in 
						   (select id from all_mang) as can from  
						   "Test"."Requests" r join "Test".users u
						   on r.creator = u.id

 