
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var webView = ccui.WebView.create();
        webView.setPosition(size.width/2, size.height/2);
        webView.setContentSize({width: size.width/2,height: size.height/2});
        webView.loadURL("http://www.google.com");
        webView.setScalesPageToFit(true);
        

        webView.setOnShouldStartLoading(function(){
            webView.evaluateJS("alert(\"ShouldStartLoading\")")
        });
        webView.setOnDidFinishLoading(function(){
            webView.evaluateJS("alert(\"DidFinishLoading\")")
        });
        webView.setOnDidFailLoading(function(){
            webView.evaluateJS("alert(\"DidFailLoading\")")
        });

        this.addChild(webView)

        var urlTextField = new ccui.TextField("Input a URL here", "Arial", 20);
        urlTextField.setPlaceHolderColor(cc.color.RED);
        urlTextField.x = size.width / 2 - 80;
        urlTextField.y = size.height / 2 + webView.getContentSize().height / 2 + urlTextField.getContentSize().height/2 + 10;
        urlTextField.setAnchorPoint(cc.p(0,0.5));
        this.addChild(urlTextField);

        var httpLabel = new ccui.Text("http:// ", "Arial", 20);
        httpLabel.setTextColor(cc.color.GREEN);
        httpLabel.x = size.width / 2 - 80 - urlTextField.getContentSize().width/2;
        httpLabel.y = size.height / 2 + webView.getContentSize().height / 2 + urlTextField.getContentSize().height/2 + 10;
        httpLabel.setAnchorPoint(cc.p(1,0.5));
        this.addChild(httpLabel);

        var resetBtn = new ccui.Button();
        resetBtn.setTouchEnabled(true);
        resetBtn.loadTextures(res.CloseNormal_png, res.CloseSelected_png, "");
        resetBtn.x = size.width / 2 + 50;
        resetBtn.y = size.height / 2 + webView.getContentSize().height/2 + resetBtn.getContentSize().height/2 + 40;
        resetBtn.setTitleText("Visit URL");
        resetBtn.addTouchEventListener( function(sender, type){
            if ( type == ccui.Widget.TOUCH_BEGAN ) webView.loadURL("http://" + urlTextField.getString());
        }, this);
        this.addChild(resetBtn);

        var reloadBtn = new ccui.Button();
        reloadBtn.setTouchEnabled(true);
        reloadBtn.loadTextures(res.CloseNormal_png, res.CloseSelected_png, "");
        reloadBtn.x = size.width / 2 + webView.getContentSize().width/2 + reloadBtn.getContentSize().width/2 + 10;
        reloadBtn.y = size.height / 2 + 50;
        reloadBtn.setTitleText("Reload");
        reloadBtn.addTouchEventListener( function(sender, type){
            if ( type == ccui.Widget.TOUCH_BEGAN ) webView.reload();
        }, this);
        this.addChild(reloadBtn);

        var forwardBtn = new ccui.Button();
        forwardBtn.setTouchEnabled(true);
        forwardBtn.loadTextures(res.CloseNormal_png, res.CloseSelected_png, "");
        forwardBtn.x = size.width / 2 + webView.getContentSize().width/2 + reloadBtn.getContentSize().width/2 + 10;
        forwardBtn.y = size.height / 2;
        forwardBtn.setTitleText("Forward");
        forwardBtn.addTouchEventListener( function(sender, type){
            if ( type == ccui.Widget.TOUCH_BEGAN ) webView.goForward();
        }, this);
        this.addChild(forwardBtn);

        var backBtn = new ccui.Button();
        backBtn.setTouchEnabled(true);
        backBtn.loadTextures(res.CloseNormal_png, res.CloseSelected_png, "");
        backBtn.x = size.width / 2 + webView.getContentSize().width/2 + reloadBtn.getContentSize().width/2 + 10;
        backBtn.y = size.height / 2 - 50;
        backBtn.setTitleText("Back");
        backBtn.addTouchEventListener( function(sender, type){
            if ( type == ccui.Widget.TOUCH_BEGAN ) webView.goBack();
        }, this);
        this.addChild(backBtn);


        var loadFileBtn = new ccui.Button();
        loadFileBtn.setTouchEnabled(true);
        loadFileBtn.loadTextures(res.CloseNormal_png, res.CloseSelected_png, "");
        loadFileBtn.x = size.width / 2 - ( webView.getContentSize().width/2 + reloadBtn.getContentSize().width/2 + 10 );
        loadFileBtn.y = size.height / 2 - 50;
        loadFileBtn.setTitleText("Load FILE");
        loadFileBtn.addTouchEventListener( function(sender, type){
            if ( type == ccui.Widget.TOUCH_BEGAN ) webView.loadFile("res/Test.html");
        }, this);
        this.addChild(loadFileBtn);


        var loadHTMLBtn = new ccui.Button();
        loadHTMLBtn.setTouchEnabled(true);
        loadHTMLBtn.loadTextures(res.CloseNormal_png, res.CloseSelected_png, "");
        loadHTMLBtn.x = size.width / 2 - ( webView.getContentSize().width/2 + reloadBtn.getContentSize().width/2 + 10 );
        loadHTMLBtn.y = size.height / 2;
        loadHTMLBtn.setTitleText("Load Data");
        loadHTMLBtn.addTouchEventListener( function(sender, type){
            if ( type == ccui.Widget.TOUCH_BEGAN ) 
                webView.loadHTMLString("<body style=\"font-size:50px;\">Hello World </body>");
        }, this);
        this.addChild(loadHTMLBtn);

        var evalJsBtn = new ccui.Button();
        evalJsBtn.setTouchEnabled(true);
        evalJsBtn.loadTextures(res.CloseNormal_png, res.CloseSelected_png, "");
        evalJsBtn.x = size.width / 2 - ( webView.getContentSize().width/2 + reloadBtn.getContentSize().width/2 + 10 );
        evalJsBtn.y = size.height / 2 + 50;
        evalJsBtn.setTitleText("Evaluate JS");
        evalJsBtn.addTouchEventListener( function(sender, type){
            if ( type == ccui.Widget.TOUCH_BEGAN ) webView.evaluateJS("alert(\"hello\")");
        }, this);
        this.addChild(evalJsBtn);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

