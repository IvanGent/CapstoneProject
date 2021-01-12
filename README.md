# CapstoneProject

-Routes
	- “/“
	-“/login”
	-“/signup”
	-“/users/{usersId}“
	-“/users/groups”
	-“‘/users/favs/{favsId}”
	-“/groups/{groupId}”
  
  
 -MVP
	-“Reviews”
    -create/edit/delete reviews
	-“Favs List”
    -create/edit/delete resturants on the list
	-“Ratings”
    -create/delete ratings
	-“Friendships”
    -create/delete friends
	-“Groups”
    -create/edit/delete groups


-DB
	“Users”
	“Reviews”
	“Ratings”
	“Favs List”
	“Friendships”
	“Groups”	

	-Table relationships:

	“Users” one to many “Favs List”
	“Users” many to many “Groups.userId”
	“Users” one to many “Groups.admin_id”
	“Users” one to many “Reviews.userId”
	“Users” one to many “Ratings.userId”
	“Users” many to many “Friendships.usersId”
	“Users” many to many “Friendships.senderId”