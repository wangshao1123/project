var express=require("express");
var server = express();
var static=require("express-static");
var url = require("url")
var fs=require("fs");
var mysql=require("mysql");
var db = mysql.createConnection({
	host:"127.0.0.1",
	user:"root",
	password:"123456",
	database:"user",
	timezone:"08:00"
})
db.connect();
var n=0;
//steam游戏数据
server.get("/gameData",function(request,response){
	var callback=parseUrl(request.url).callback;
	fs.readFile("data/recommendGame.json",function(error,data){
		console.log("接收到请求...");
		if(!error){
			console.log("成功处理第"+(++n)+"次请求!")
			response.end(callback + "(" + data + ")");
		}
		else{
			console.log("处理失败！")
			response.end("error")
		}
	});
})
//添加
server.get("/register",function(request,response){
	var parse=url.parse(request.url,true).query;
	var name=parse.name;
	var sex=parse.sex;
	var birthday=parse.birthday;
	var department=parse.department;
	var status=parse.status;
	var joinDate=parse.joinDate;
	var leaveDate=parse.leaveDate;
	var salary=parse.salary;
	var IDCard=parse.IDCard;
	var number=parse.number;
	if(name&&sex&&department&&status&&salary&&IDCard&&number){
		db.query(`INSERT INTO work (name,sex,birthday,department,status,joinDate,leaveDate,salary,IDCard,number) VALUES ("${name}","${sex}","${birthday}","${department}","${status}","${joinDate}","${leaveDate}","${salary}","${IDCard}","${number}")`,(error,data)=>{
			if(error){
				console.log("写入新用户失败")
				response.end("error"); 
			}
			else{
				console.log(`写入新用户成功!`)
				response.end("success");
			}
		})
	}else{
		console.log("数据不够！")
		response.end("error"); 
	}
})
//查询
server.get("/sel",function(request,response){
	db.query(`SELECT * FROM work`,(error,data)=>{
		if(error){
			console.log("查询失败！");
			response.end("error");
		}else{
			console.log("查询成功！");
			response.end(JSON.stringify(data));
		}
	})
})
//删除
server.get("/del",function(request,response){
	var id=url.parse(request.url,true).query.id;
	db.query(`DELETE  FROM work WHERE id="${id}"`,(error,data)=>{
		if(error){
			console.log("删除失败！");
			response.end("error");
		}else{
			console.log("删除成功！");
			response.end("success");
		}
	})
})
//修改
server.get("/updata",function(request,response){
	var parse=url.parse(request.url,true).query;
	var id=parse.id;
	var name=parse.name;
	var sex=parse.sex;
	var birthday=parse.birthday;
	var department=parse.department;
	var status=parse.status;
	var joinDate=parse.joinDate;
	var leaveDate=parse.leaveDate;
	var salary=parse.salary;
	var IDCard=parse.IDCard;
	var number=parse.number;
	db.query(`UPDATE work SET name="${name}",sex="${sex}",birthday="${birthday}",department="${department}",status="${status}",joinDate="${joinDate}",leaveDate="${leaveDate}",salary="${salary}",IDCard="${IDCard}",number="${number}" WHERE id="${id}"`,function(error,data){
		if(error){
			console.log("id为"+id+"的数据修改失败！");
			response.end("error");
		}else{
			console.log("id为"+id+"的数据修改成功！");
			response.end("success");
		}
	});
})
//查询考勤管理
server.get("/selcheakon",function(request,response){
	db.query(`SELECT * FROM checkon`,(error,data)=>{
		if(error){
			console.log("查询失败！");
			response.end("error");
		}else{
			console.log("考勤查询成功！");
			response.end(JSON.stringify(data));
		}
	})
})
server.use(express.static(__dirname+"/static"));
// 将服务开启到本地的某个端口上
server.listen(90);