(function ($, document) {
    var  html = '',k = 1,level = 1;
    
    var menuTreeDataJson = [
        {
            name: "测试1",
            parent: true,
            url: "https://www.baidu.com",
            children: [
                {
                    name: "测试11",
                    parent: false,
                    url: "https://www.baidu.com"
                },
                {
                    name: "测试12",
                    parent: false,
                    url: "https://www.baidu.com"
                }
            ]
        },
        {
            name: "测试2",
            parent: false,
            url: "https://www.baidu.com"
        },
        {
            name: "测试3",
            parent: false,
            url: "https://www.baidu.com"
        }
    ]
    
    var config = {
        data: menuTreeDataJson,
        menuNodeClick: '',
        nodeId: 'menuTreeBox',
        menuTreeHtml: html,
    }
    
    var MenuTree = function (options) {
        var that = this;
        if (options) {
            that.data    = options.data;
            that.nodeId  = options.nodeId;
            that.options = $.extend({}, config, that.data, options);
        } else {
            that.data    = config.data;
            that.nodeId  = config.nodeId;
        }
        that.init();
        
    }
    
    MenuTree.prototype = {
        init: function () {
            var that = this;
            this.GetMenuTreeData(that)
            this.switchTreeNode()
        },
        
        GetMenuTreeData: function (that) {
            var data = that.data;
            if (data && data !== '') {
                var menuHtml = this.GetMenuTreeHtml(data);
                var id_ = that.nodeId;
                config.menuTreeHtml = menuHtml
                var addUl = $('<ul id="menu_1_ul">').html(menuHtml)
                $("#" + id_).html(addUl);
                
            } else {
                console.log("data error");
            }
            
        },
        
        GetMenuTreeHtml: function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                k++;
                if (data[i].children) {
                    level++
                    html += '<li class="menuItem " id="menu_' + k + '_tree"><span class="menuItem item" id="menu_' + k + '_span">' + data[i].name + '</span><span class="pSwitch" id="menu_' + k + '_icon" ></span><ul class="childMenu" id="menu_' + k + '_ul"   >'
                    
                    this.GetMenuTreeHtml(data[i].children)
                    
                } else if (i == len - 1 && level > 1) {
                    html += '<li id="menu_' + k + '_tree" class="menuItem item child-item"><a id="menu_' + k + '_a" href="' + data[i].url + '" >' + data[i].name + '</a></li></ul ></li>'
                    
                } else {
                    html += '<li id="menu_' + k + '_tree" class="menuItem item"><a id="menu_' + k + '_a" href="' + data[i].url + '">' + data[i].name + '</a></li>'
                }
                
            }
            
            return level--, html += '</li></ul>';
            
        },
        switchTreeNode: function () {
            
            // icon单击 打开/关闭
            $('.pSwitch').click(function () {
                var menuTreeClickNode = $(this);
                openNodes(menuTreeClickNode, 'click');
                
                // 注册点击事件
                if (typeof openMenuTreeNodes === "function") {
                    openMenuTreeNodes(menuTreeClickNode)
                    
                } else {
                    console.log('no')
                }
            })
            
            // icon双击 打开/关闭
            $('li').dblclick(function (ev) {
                // 阻止冒泡
                var oEvent = ev || event;
                oEvent.cancelBubble = true;
                oEvent.stopPropagation();
                
                var menuTreeDblclickNode = $(this);
                openNodes(menuTreeDblclickNode, 'dblclick');
                
            })
        }
    }
    
    function openNodes(node, type) {
        var openUl, openIcon;
        
        if (type == 'click') {
            openIcon = node;
            openUl   = node.next('.childMenu');
            
        } else if (type == 'dblclick') {
            openUl   = node.children('.childMenu');
            openIcon = node.children('.pSwitch');
            
        }
        openUl.slideToggle(500)
        openIcon.toggleClass('closeIcon')
    }
    
    
    //暴露接口
    $.fn.MenuTree = function (option) {
        return new MenuTree(option)
    }
    
    //构造
    $.fn.MenuTree.constructor = MenuTree;
    
})(jQuery, document)

// var MenuTree = new MenuTree()