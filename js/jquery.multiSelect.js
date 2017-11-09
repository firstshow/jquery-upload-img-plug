/**
 * Created by zhangcheng on 25/09/2017.
 * 多级联动 下拉选择插件
 */

;(function($,window,document,underfined){
    var select = function(el,options){
        this.$el = el[0];

        this.mouseOver = false; // 为了阻止多次触发mouseover事件
        var defaults = {
            list:[
                {
                    id:1,
                    name:'美食1',
                    childs:[
                        {
                            id:11,
                            name:'美食11',
                            childs:[
                                {
                                    id:111,
                                    name:'美食111',
                                },
                                {
                                    id:112,
                                    name:'美食112',
                                },
                                {
                                    id:113,
                                    name:'美食113',
                                },
                                {
                                    id:114,
                                    name:'美食114',
                                },
                                {
                                    id:115,
                                    name:'美食115',
                                },
                                {
                                    id:116,
                                    name:'美食116',
                                },
                                {
                                    id:117,
                                    name:'美食117',
                                },
                                {
                                    id:118,
                                    name:'美食118',
                                },
                                {
                                    id:119,
                                    name:'美食119',
                                },
                            ]
                        },
                        {
                            id:12,
                            name:'美食12',
                            childs:[
                                {
                                    id:121,
                                    name:'美食121',
                                },
                                {
                                    id:122,
                                    name:'美食122',
                                },
                            ]
                        },
                    ]
                },
                {
                    id:2,
                    name:'美食2',
                    childs:[
                        {
                            id:22,
                            name:'美食22',
                            childs:[
                                {
                                    id:222,
                                    name:'美食222',
                                },
                            ]
                        },
                    ]
                },
                {
                    id:3,
                    name:'美食3',
                    childs:[
                        {
                            id:33,
                            name:'美食33',
                            childs:[]
                        },
                    ]
                },
                {
                    id:4,
                    name:'美食4',
                    childs:[]
                },
            ],
            firstIndex:0, // 初始化第一列选中的index
            secondIndex:0, // 初始化第二列选中的index
            thirdIndex:0 // 初始化第三列选中的index
        };
        this.options = $.extend({},defaults,options);
        this.html = '<div class="x-down-select-box">'+
                        '<ul id="first-select-list" class="x-select-list"></ul>'+
                        '<ul id="second-select-list" class="x-select-list"></ul>'+
                        '<ul id="third-select-list" class="x-select-list"></ul>'+
                    '</div>';
    };

    select.prototype = {
        /**
         * 初始化选择列表
         * */
        init: function(){
            if($('.x-down-select-box').length === 0){
                $('body').append(this.html);
                this.bindEvent();
                this.updateData();
                setTimeout(function(){
                    $('.x-down-select-box').addClass('-show');
                },10);
            }
        },
        /**
         * 更新数据
         * */
        updateData: function(){
            var posTop =  $(this.$el).offset().top + this.$el.offsetHeight + 2, // 位置top
                posLeft = $(this.$el).offset().left; // 位置left

            this.initFirstSelectList();
            $('.x-down-select-box').css('top',posTop);
            $('.x-down-select-box').css('left',posLeft);
        },
        /**
         * 初始化第一个列表
         * */
        initFirstSelectList: function(){
            var list = this.options.list,
                firstListHtmlArry = [];
            for(var i = 0;i < list.length;i++){
                var firstHtml = '';
                if(list[i].childs && list[i].childs.length > 0){
                    if(i === this.options.firstIndex){ console.log(i+'第一个：'+ this.options.firstIndex);
                        firstHtml = `<li class="-active" data-type="mouse-over-li" data-id=${list[i].id} data-column="1" data-i=${i}>${list[i].name}</li>`;
                    } else {
                        firstHtml = `<li data-type="mouse-over-li" data-id=${list[i].id} data-column="1" data-i=${i}>${list[i].name}</li>`;
                    }

                } else {
                    if(i === this.options.firstIndex){ console.log(i+'第一个：'+ this.options.firstIndex);
                        firstHtml = `<li class="-no-child -active" data-type="mouse-over-li" data-id=${list[i].id} data-column="1" data-i=${i}>${list[i].name}</li>`;
                    } else {
                        firstHtml = `<li class="-no-child" data-type="mouse-over-li" data-id=${list[i].id} data-column="1" data-i=${i}>${list[i].name}</li>`;
                    }
                    $('#second-select-list').html('');
                }
                firstListHtmlArry.push(firstHtml);
            }

            // 设置scrollTop，让选中值在第一个；32是一个li的高度
            $('#first-select-list').html(firstListHtmlArry.join('')).scrollTop(32 * this.options.firstIndex);

            this.initSecondSelectList(this.options.firstIndex);
        },
        /**
         * 初始化第二个列表
         * @param i 当前选择的是属于第一分类中的第几个
         * */
        initSecondSelectList: function(i){
            var list = this.options.list,
                secondListHtmlArry = [];

            for(var j = 0;j < list[i].childs.length;j++){
                var secondHtml = '';
                if(list[i].childs[j].childs && list[i].childs[j].childs.length > 0){
                    if(j === this.options.secondIndex){
                        secondHtml = `<li class="-active" data-type="mouse-over-li" data-id=${list[i].childs[j].id} data-column="2" data-i=${i} data-j=${j}>${list[i].childs[j].name}</li>`;
                    } else {
                        secondHtml = `<li data-type="mouse-over-li" data-id=${list[i].childs[j].id} data-column="2" data-i=${i} data-j=${j}>${list[i].childs[j].name}</li>`;
                    }
                } else {
                    if(j === this.options.secondIndex){
                        secondHtml = `<li class="-no-child -active" data-type="mouse-over-li" data-id=${list[i].childs[j].id} data-column="2" data-i=${i} data-j=${j}>${list[i].childs[j].name}</li>`;
                    } else {
                        secondHtml = `<li class="-no-child" data-type="mouse-over-li" data-id=${list[i].childs[j].id} data-column="2" data-i=${i} data-j=${j}>${list[i].childs[j].name}</li>`;
                    }

                    $('#third-select-list').html('');
                }
                secondListHtmlArry.push(secondHtml);
            }

            // 之前设置过后，则选中！但是有种情况是之前选中的第二级目录的index 会大于原数组
            if(this.options.secondIndex < j){
                this.initThirdSelectList(i,this.options.secondIndex);
            } else {
                this.initThirdSelectList(i,0);
            }
            // 设置scrollTop，让选中值在第一个；32是一个li的高度
            $('#second-select-list').html(secondListHtmlArry.join('')).scrollTop(32 * this.options.secondIndex);
        },
        /**
         * 初始化第三个列表
         * @param i 当前选择的是属于第一分类中的第几个
         * @param j 当前选择的是属于第二分类中的第几个
         * */
        initThirdSelectList: function(i,j){
            var list = this.options.list,
                thirdListHtmlArry = [],
                thirdHtml = '';
            try{
                for(var k = 0;k < list[i].childs[j].childs.length;k++){
                    if(k === this.options.thirdIndex){ console.log(k+'第三个：'+ this.options.thirdIndex);
                        thirdHtml = `<li class="-no-child -active" data-type="mouse-over-li" data-id=${list[i].childs[j].childs[k].id} data-column="3" data-i=${i} data-j=${j} data-k=${k}>${list[i].childs[j].childs[k].name}</li>`;
                    } else {
                        thirdHtml = `<li class="-no-child" data-type="mouse-over-li" data-id=${list[i].childs[j].childs[k].id} data-column="3" data-i=${i} data-j=${j} data-k=${k}>${list[i].childs[j].childs[k].name}</li>`;
                    }
                    thirdListHtmlArry.push(thirdHtml);
                }
            } catch (err){
                thirdHtml = '';
            }

            // 设置scrollTop，让选中值在第一个；32是一个li的高度
            $('#third-select-list').html(thirdListHtmlArry.join('')).scrollTop(32 * this.options.thirdIndex);
        },
        /**
         * 隐藏下拉列表
         * */
        destroy: function(){
            this.unbindEvent();
            $('.x-down-select-box').removeClass('-show');
            setTimeout(function(){
                $('body').find(".x-down-select-box").remove();
            },100)
        },
        /**
         * 绑定函数
         * */
        bindEvent: function () {
            var that = this;
            // 点击其它地方，隐藏下拉列表
            setTimeout(function(){
                $(document).on('click',function(){
                    that.destroy();
                });
            },100);

            // 根据data-type 绑定对应的事件
            $('.x-down-select-box').on({
                'mouseover': function (event) {
                    switch (event.target.getAttribute("data-type")) {
                        case 'mouse-over-li':
                            that.mouseOverSelect(event);
                            break;
                        default:
                            break;
                    }
                },
                'mouseout': function (event) {
                    switch (event.target.getAttribute("data-type")) {
                        case 'mouse-over-li':
                            that.mouseOver = false;
                            break;
                        default:
                            break;
                    }
                },
                'click': function (event) {
                    var i= event.target.getAttribute("data-i"), // 当前选择的是属于第一分类中的第几个
                        j= event.target.getAttribute("data-j"), // 当前选择的是属于第二分类中的第几个
                        k= event.target.getAttribute("data-k"); // 当前选择的是属于第三分类中的第几个

                    switch (event.target.getAttribute("data-type")) {
                        case 'mouse-over-li':
                            if(event.target.className.indexOf('-no-child') > -1 ){
                                var data = {};

                                try{
                                    data.firstList = that.options.list[i];
                                    data.firstList.index = i;
                                } catch (err){}

                                try{
                                    data.secondList = that.options.list[i].childs[j];
                                    data.secondList.index = j;
                                } catch (err){}

                                try{
                                    data.thirdList = that.options.list[i].childs[j].childs[k];
                                    data.thirdList.index = k;
                                } catch (err){}
                                that.destroy();
                                that.confirm(data);
                            }
                            break;
                        default:
                            break;
                    };

                    // 点击其它地方时候隐藏下拉框
                    that.stopPropagation(event);
                },
            });
        },
        /**
         * 阻止冒泡事件
         * */
        stopPropagation(event) {
            event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        },
        /**
         * 从dom中移除元素前，解除之前的绑定时间
         * 删除的只是DOM结构，内存中依旧保存着数据。所以要手动将DOM占用的内存清空。
         * */
        unbindEvent: function () {
            $('.x-down-select-box').unbind('click mouseover mouseout');
            $(document).unbind('click');
        },
        /**
         * 鼠标移上去的选择时间
         * */
        mouseOverSelect: function(event){
            var listColumn= event.target.getAttribute("data-column")*1, // 当前是第几个分类
                i= event.target.getAttribute("data-i"), // 当前选择的是属于第一分类中的第几个
                j= event.target.getAttribute("data-j"); // 当前选择的是属于第二分类中的第几个
            if(!this.mouseOver){
                this.mouseOver = true;

                switch (listColumn){
                    case 1:
                        $('#first-select-list li').removeClass('-active'); // 把第一列的选中li 取出-active
                        // 添加选中样式
                        if(event.target.className.indexOf('-active') === -1){
                            event.target.className += ' -active';
                        }
                        this.initSecondSelectList(i);
                        break;
                    case 2:
                        $('#second-select-list li').removeClass('-active'); // 把第二列的选中li 取出-active
                        // 添加选中样式
                        if(event.target.className.indexOf('-active') === -1){
                            event.target.className += ' -active';
                        }
                        this.initThirdSelectList(i,j);
                        break;
                    case 3:
                        $('#third-select-list li').removeClass('-active'); // 把第二列的选中li 取出-active
                        // 添加选中样式
                        if(event.target.className.indexOf('-active') === -1){
                            event.target.className += ' -active';
                        }
                        break;
                    default :
                        break;
                }
            }
        },
        /**
         * 确认选择
         * @param callback 选择完成后的回调函数
         * */
        confirmSelect: function(callback){
            this.confirm = callback;
        }
    }

    $.fn.jQueryMultiSelect = function(options){
        var myPlugin = new select(this,options);
        myPlugin.init();
        return myPlugin;
    }
})(jQuery,window,document);