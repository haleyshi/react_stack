# react_stack
Clone from https://github.com/hendrikswan/react-stack for self learning

## webpack
npm install

npm install -g webpack

webpack


### Auto reloading
npm install -g webpack-dev-server

webpack-dev-server --progress --color

## Simple HTTP Server from Python
python -m SimpleHTTPServer



## Run WebPack Dev Server with auto reloading
node server


## Material-UI 
### Colors
material-ui.com/#/customization/colors

## Firebase
#### Create new WebApp
https://www.firebase.com/

Google Account

新建项目 - react-stack

https://console.firebase.google.com/


Get ref for your database: https://react-stack-89fd0.firebaseio.com/

#### Import Data
Database >> 数据 >> 导入JSON文件 >> ./data/messages.json

#### Public Access
Database >> 规则 >> Allow public access, refer https://firebase.google.com/docs/database/security/quickstart

{
  "rules": {
    ".read": true,
    ".write": true
  }
}

#### My Data
Get ref for your data: https://react-stack-89fd0.firebaseio.com/messages