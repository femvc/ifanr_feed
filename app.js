'use strict'

var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var Formidable = require('formidable')

var app = express()
var port = 80


app.use(cookieParser())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
	console.log('req.url: ' + req.url)
	next()
})

app.use(express.static(__dirname + '/public', { maxAge: '1s'}))

app.all('/?', function(req, res) {
	res.send('Hi')
})
app.all('/hi', function(req, res) {
	res.send('Hi world')
})
app.all('/api/v3.0/', function(req, res) {
	res.setHeader('Content-Type', 'text/json');
	var html = req.query.callback + '({"data":{"hots":[{"comment_id":"1189035","comment_author":"61\\u9646\\u6bc5","sso_id":"38478145","avatar":"https:\\/\\/media.ifanrusercontent.com\\/media\\/tavatar\\/e6\\/1c\\/e61c51d6487acec78a78a07f4586a33304170255.jpg","comment_author_url":"","comment_content":"<p>\\u7f8e\\u56fd\\u7684\\u51ef\\u8fea\\u62c9\\u514b\\u7684\\u8d28\\u91cf\\uff0c\\u4eca\\u5e74\\u88abCR\\u6392\\u5728\\u4e86\\u5012\\u6570\\u7b2c\\u4e00\\uff0c\\u53ef\\u9760\\u6027\\u6ca1\\u6709\\u4efb\\u4f55\\u4e00\\u6b3e\\u8f66\\u5728\\u5e73\\u5747\\u503c\\u4ee5\\u4e0a\\u3002\\u603b\\u5206\\u6765\\u8bf4\\uff0c\\u8868\\u73b0\\u6700\\u597d\\u7684\\u662fCT6\\u768475\\u5206\\uff0c\\u5176\\u4ed6\\u6ca1\\u6709\\u8fc765\\u7684\\uff0c\\u8ddf\\u6377\\u8c79\\u8def\\u864e\\u4e00\\u4e2a\\u6c34\\u5e73\\u3002\\u7279\\u65af\\u62c9\\u81f3\\u5c11Model S\\u8fd8\\u5728\\u5e73\\u5747\\u7ebf\\u4ee5\\u4e0a\\uff0c\\u867d\\u7136Model X\\u662f\\u6e23\\u3002<\\/p>\\n","comment_date":"2017-10-31 16:18:20","comment_parent":"0","comment_rating_up":"7","comment_rating_down":"1","rating_status":null,"rated":0,"comment_mail_notify":"1","depth":1,"from_app":null,"from_app_name":"","seo_detail_link":"http:\\/\\/www.ifanr.com\\/932128\\/comment\\/1189035"},{"comment_id":"1189142","comment_author":"kin-\\u6cd5\\u514b-\\u7206-\\u7801\\u8868","sso_id":"30384752","avatar":"https:\\/\\/media.ifanrusercontent.com\\/media\\/tavatar\\/cf\\/83\\/cf83e563ce2cafbe40d1c5af3533d939a180d1c2.jpg","comment_author_url":"","comment_content":"<p>\\u81ea\\u8d38\\u533a\\u5efa\\u5382\\u7684\\u662f\\u751f\\u4ea7\\u7684\\u8fd8\\u662f\\u7b97\\u8fdb\\u53e3\\u8f66\\uff0c\\u8fd8\\u662f\\u80fd\\u4eab\\u53d7\\u5230\\u9ad8\\u989d\\u7684\\u8fdb\\u53e3\\u7a0e<\\/p>\\n","comment_date":"2017-11-01 11:08:55","comment_parent":"0","comment_rating_up":"1","comment_rating_down":"0","rating_status":null,"rated":0,"comment_mail_notify":"1","depth":1,"from_app":null,"from_app_name":"","seo_detail_link":"http:\\/\\/www.ifanr.com\\/932128\\/comment\\/1189142"}],"all":[{"comment_id":"1189035","comment_author":"61\\u9646\\u6bc5","sso_id":"38478145","avatar":"https:\\/\\/media.ifanrusercontent.com\\/media\\/tavatar\\/e6\\/1c\\/e61c51d6487acec78a78a07f4586a33304170255.jpg","comment_author_url":"","comment_content":"<p>\\u7f8e\\u56fd\\u7684\\u51ef\\u8fea\\u62c9\\u514b\\u7684\\u8d28\\u91cf\\uff0c\\u4eca\\u5e74\\u88abCR\\u6392\\u5728\\u4e86\\u5012\\u6570\\u7b2c\\u4e00\\uff0c\\u53ef\\u9760\\u6027\\u6ca1\\u6709\\u4efb\\u4f55\\u4e00\\u6b3e\\u8f66\\u5728\\u5e73\\u5747\\u503c\\u4ee5\\u4e0a\\u3002\\u603b\\u5206\\u6765\\u8bf4\\uff0c\\u8868\\u73b0\\u6700\\u597d\\u7684\\u662fCT6\\u768475\\u5206\\uff0c\\u5176\\u4ed6\\u6ca1\\u6709\\u8fc765\\u7684\\uff0c\\u8ddf\\u6377\\u8c79\\u8def\\u864e\\u4e00\\u4e2a\\u6c34\\u5e73\\u3002\\u7279\\u65af\\u62c9\\u81f3\\u5c11Model S\\u8fd8\\u5728\\u5e73\\u5747\\u7ebf\\u4ee5\\u4e0a\\uff0c\\u867d\\u7136Model X\\u662f\\u6e23\\u3002<\\/p>\\n","comment_date":"2017-10-31 16:18:20","comment_parent":"0","comment_rating_up":"7","comment_rating_down":"1","rating_status":null,"rated":0,"comment_mail_notify":"1","depth":1,"from_app":null,"from_app_name":"","seo_detail_link":"http:\\/\\/www.ifanr.com\\/932128\\/comment\\/1189035"},{"comment_id":"1189060","comment_author":"\\u5927\\u5bcc\\u8c6a","sso_id":"29500892","avatar":"http:\\/\\/gravatar.ifanrx.com\\/avatar\\/8bf33a0d73bff0cb86fedeecc07819fb?d=http%3A%2F%2Fcdn.ifanr.cn%2Fifanr%2Fdefault_avatar.png","comment_author_url":"","comment_content":"<p>\\u5f53\\u7136\\u662f\\u6b27\\u6d32\\uff0c\\u65e5\\u672c\\u8f66\\u597d\\u3002\\u97e9\\u56fd\\u4e5f\\u4e0d\\u9519<\\/p>\\n","comment_date":"2017-10-31 20:09:04","comment_parent":"0","comment_rating_up":"2","comment_rating_down":"5","rating_status":null,"rated":0,"comment_mail_notify":"0","depth":1,"from_app":"<a href=\\"http:\\/\\/ifanr.com\\/special\\/ifanr-android-app\\" target=\\"_blank\\">\\u6765\\u81ea Android \\u5ba2\\u6237\\u7aef<\\/a>","from_app_name":"\\u6765\\u81ea Android \\u5ba2\\u6237\\u7aef","seo_detail_link":"http:\\/\\/www.ifanr.com\\/932128\\/comment\\/1189060"},{"comment_id":"1189142","comment_author":"kin-\\u6cd5\\u514b-\\u7206-\\u7801\\u8868","sso_id":"30384752","avatar":"https:\\/\\/media.ifanrusercontent.com\\/media\\/tavatar\\/cf\\/83\\/cf83e563ce2cafbe40d1c5af3533d939a180d1c2.jpg","comment_author_url":"","comment_content":"<p>\\u81ea\\u8d38\\u533a\\u5efa\\u5382\\u7684\\u662f\\u751f\\u4ea7\\u7684\\u8fd8\\u662f\\u7b97\\u8fdb\\u53e3\\u8f66\\uff0c\\u8fd8\\u662f\\u80fd\\u4eab\\u53d7\\u5230\\u9ad8\\u989d\\u7684\\u8fdb\\u53e3\\u7a0e<\\/p>\\n","comment_date":"2017-11-01 11:08:55","comment_parent":"0","comment_rating_up":"1","comment_rating_down":"0","rating_status":null,"rated":0,"comment_mail_notify":"1","depth":1,"from_app":null,"from_app_name":"","seo_detail_link":"http:\\/\\/www.ifanr.com\\/932128\\/comment\\/1189142"},{"comment_id":"1196162","comment_author":"ZED","sso_id":"32076850","avatar":"https:\\/\\/media.ifanrusercontent.com\\/media\\/user_files\\/uploaded\\/1b\\/93\\/1b93be258fa80643a6e199bfb52f16e5b39a3029-8366362104343ced964839bf4e008180b44038e9.jpg","comment_author_url":"","comment_content":"<p>\\u8f6f\\u4ef6\\u5de5\\u7a0b\\u5e08\\u627ebug\\u80fd\\u529b\\u53ef\\u89c1\\u4e00\\u6591<\\/p>\\n","comment_date":"2018-01-08 16:50:03","comment_parent":"0","comment_rating_up":"0","comment_rating_down":"0","rating_status":null,"rated":0,"comment_mail_notify":"0","depth":1,"from_app":"<a href=\\"http:\\/\\/www.ifanr.com\\/special\\/ifanr-iphone-app\\" target=\\"_blank\\">\\u6765\\u81ea iPhone \\u5ba2\\u6237\\u7aef<\\/a>","from_app_name":"\\u6765\\u81ea iPhone \\u5ba2\\u6237\\u7aef","seo_detail_link":"http:\\/\\/www.ifanr.com\\/932128\\/comment\\/1196162"}]},"status":1})'
	res.write(html)
	res.end()
})

app.all('/test/:id', function(req, res) {
	var result = {
		cookie: req.cookie,
		params: req.params,
		query: req.query,
		body: req.body
	}

	res.send(result)
})

var server = app.listen(port, function() {
	console.log('Example app listening at http://0.0.0.0:%s', port)
});