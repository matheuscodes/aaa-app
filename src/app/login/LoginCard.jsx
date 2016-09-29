var React = require('react');

var MUI = require('app/common/MaterialUI');
var API = require('api');
var downloadFile = require('api/helpers/DownloadFile');

var Notice = require('app/common/Notice.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {login:{}}
  },
  componentDidMount: function() {
    const selected = Math.floor(Math.random()*17);
    var callbacks = {
      context: this,
      "200": function(request){
        var current = this.state;
        current.image = selected;
        current.imageData = JSON.parse(request.responseText);
        this.setState(current);
      },
      failure: function(request){
        //TODO handle me
        console.log("ERROR",request);
      }
    }
    downloadFile('img/'+selected+'.json',callbacks);
  },
  doLogin: function(){
    var callbacks = {
      context: this,
      success: function(request){
        this.showMessage('Text [login succeeded]','MESSAGE');
      },
      error: function(request){
        this.showMessage('Text [login failed]','ERROR');
      }
    }
    API.login(this.state.login,callbacks);
  },
  showMessage: function(message,type){
    var current = this.state;
    current.message = {
      text: message,
      open: true,
      type: type
    }
    this.setState(current);
  },
  hideMessage: function(){
    var current = this.state;
    current.message.open = false;
    this.setState(current);
  },
  changeEmail: function(event){
    var current = this.state;
    current.login.email = event.target.value;
  },
  changePassword: function(event){
    var current = this.state;
    current.login.password = event.target.value;
  },
  render: function() {
    var title = this.state.imageData ? <a style={{color:'inherit',textDecoration:'none'}} href={this.state.imageData.source}> {this.state.imageData.title ? this.state.imageData.title : this.state.imageData.provider} </a> : "";
    var subtitle = this.state.imageData ? "Photo by "+this.state.imageData.author : "";

    return (
      <MUI.Card>
        <MUI.CardMedia overlay={<MUI.CardTitle title={title} subtitle={subtitle} />} >
          <div style={{height:300,width:'100%',background: (this.state.image ? 'url(\"img/'+this.state.image+'.jpg\") center / cover' : '')}} />
        </MUI.CardMedia>
        <MUI.CardText>
          <MUI.GridList cellHeight={'auto'} cols={1} padding={10} >
            <MUI.GridTile style={{padding:'5pt'}} cols={1} >
              <MUI.TextField
                style={{width:'100%'}}
                id={'aaa-loginEmail'}
                onChange={this.changeEmail}
                hintText={"Text[email] hint"}
                floatingLabelText={"Text[email]"} />
            </MUI.GridTile>
            <MUI.GridTile style={{padding:'5pt'}} cols={1} >
              <MUI.TextField
                style={{width:'100%'}}
                id={'aaa-loginPassword'}
                onChange={this.changePassword}
                hintText={"Text[password] hint"}
                floatingLabelText={"Text[password]"} />
            </MUI.GridTile>
          </MUI.GridList>
          {this.state.message ? <Notice message={this.state.message} onClose={this.hideMessage}/> : null}
        </MUI.CardText>
        <MUI.CardActions>
          <MUI.RaisedButton
            style={{width:'100%'}}
            label="Text[login]"
            labelPosition="before"
            primary={true}
            onTouchTap={this.doLogin}
            icon={<MUI.icons.navigation.chevron_right />} />
        </MUI.CardActions>
      </MUI.Card>
    );
  }
});
