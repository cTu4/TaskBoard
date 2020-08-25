
Ext.define('TaskBoard.view.Board',{
    extend: 'Ext.panel.Panel',
    xtype: 'board',
    id: 'board',
    reference: 'board',
    title:'Task Board',
    titleAlign: 'center',
    viewModel:{
        type: 'BoardViewModel'
    },
    bbar:{
      xtype:'button',
      handler(){
          //
          // new Ext.drag.Source({
          //     element: Ext.getBody().createChild({
          //         html: 'Drag Me',
          //         style: {
          //             zIndex: 10,
          //             width: '100px',
          //             height: '100px',
          //             border: '1px solid red',
          //             position: 'absolute',
          //             top: '50px',
          //             left: '600px'
          //         }
          //     }),
          //     proxy: {
          //         type: 'placeholder',
          //         cls: 'group-proxy',
          //         invalidCls: 'group-proxy-invalid',
          //         validCls: 'group-proxy-valid',
          //         html: 'Drag'
          //     },
          //     groups:'test',
          //     listeners: {
          //
          //     }
          // });
          //
          // new Ext.drag.Target({
          //     element: Ext.getBody().createChild({
          //         html: 'Drop Here',
          //         style: {
          //             width: '300px',
          //             height: '300px',
          //             border: '1px solid blue',
          //             position: 'absolute',
          //             top: '250px',
          //             left: '600px'
          //         }
          //     }),
          //     groups:'test',
          //     listeners: {
          //         drop(){
          //             console.log('sss')
          //         }
          //     }
          // });
          let full =['plan','progress','test','done'],
              without_plan =['progress','test','done'],
                without_progress=['plan','test','done'],
              without_test =['plan','progress','done'],
              without_done =['plan','progress','test'];


          let items = Ext.ComponentQuery.query('panel[class=source]');
            items.forEach(function (item){
                console.log(item.id_card);
                let group = '';
                switch (item.info.data.status){
                    case 'Plan':
                        group='plan';
                        break;
                    case 'In progress':
                        group='progress';
                        break;
                    case 'Test':
                        group='test';
                        break;
                    case 'Done':
                        group='done';
                        break;
                }
                new Ext.drag.Source({
                    element:item.el.dom,
                    proxy: {
                                type: 'placeholder',
                                cls: 'group-proxy',
                                invalidCls: 'group-proxy-invalid',
                                validCls: 'group-proxy-valid',
                                html: 'Drag'
                    },
                    describe(info){
                        info.setData('id',item.id_card);
                    },
                    constrain: Ext.getCmp('board').body.el.dom,
                    groups:group,
                });

            });
            items =  Ext.ComponentQuery.query('panel[class=target]');
            console.log(items);
            items.forEach(function (item){
                console.log(item.name);
                let group = '';
                switch (item.name){
                    case 'plan':
                        group=without_plan;
                        break;
                    case 'progress':
                        group=without_progress;
                        break;
                    case 'test':
                        group=without_test;
                        break;
                    case 'done':
                        group=without_done;
                        break;
                }
                new Ext.drag.Target({
                    element:item.body.el.dom,
                    groups:group,
                    listeners: {
                        drop(target,info){
                            info.getData('id').then(function (id){
                                let status = target.getElement().component.name;
                                let store = Ext.data.StoreManager.lookup('store_users');
                                var record = store.getById(id);
                                record.set('status',status);
                                console.log(store);

                            });
                        }
                    }
                });
              });
            console.log(items);
      }

    },
    setItems(data){
        let keys = Object.keys(data);
        let items = Ext.create({
            xtype:'panel',
            id:'items',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },

        });
        items.add({
            xtype:'panel',
            class: 'target',
            name: 'plan',
            id:'plan',
            title: 'Plan',
            titleAlign: 'center',
            flex:1,
            margin: '0 1px'
        },{
                xtype:'panel',
                class: 'target',
                name: 'progress',
                id:'progress',
                title: 'In Progress',
                titleAlign: 'center',
                flex:1,
                margin: '0 1px'
            },
            {
                xtype:'panel',
                name: 'test',
                class: 'target',
                title: 'Testing',
                titleAlign: 'center',
                flex:1,
                margin: '0 1px'
            },
            {
                xtype:'panel',
                class: 'target',
                name: 'done',
                title: 'Done',
                titleAlign: 'center',
                flex:1,
                margin: '0 1px'

            });
        keys.forEach(function (key){
            data[key].forEach(function (item){
                let color ='';
                switch (item.data.important){
                    case 0:
                       color='#f43343';
                       break;
                    case 1:
                        color='#f4f400';
                        break;
                    case 2:
                        color='#7dd922';
                        break;
                }
               items.down('[name='+key+']').add({
                    xtype:'panel',
                   info:item,
                   id: item.data.number,
                   id_card: item.data.id,
                   cls: 'panel-cls',
                   bodyStyle:{
                       background:color,
                   },
                   class:'source',
                   color:color,
                   selected:false,
                   margin: 10,
                   listeners:{

                        // afterRender(el){
                        //     console.log(el);
                        //     var dd = Ext.create('Ext.dd.DD', el, 'tablesDDGroup', {
                        //         isTarget: false
                        //     });
                        //     var mainTarget = Ext.create('Ext.dd.DDTarget', 'main', 'tablesDDGroup', {
                        //         ignoreSelf: false
                        //     });
                        //     Ext.apply(dd, overrides);
                        //     Ext.apply(mainTarget, overrides);
                        // },
                        click:{
                            element:'body',
                            fn(e,el){
                                let sel_card = Ext.getCmp('items').down('[selected=true]');
                                if (sel_card!=null){
                                    sel_card.setStyle('opacity',1);
                                    sel_card.selected=false;
                                }
                                let id_card = this.component.id_card;
                                let card = Ext.getCmp('items').down('[id_card='+id_card+']');
                                card.selected=true;
                                card.setStyle('opacity',0.8);
                                let data = Ext.data.StoreManager.lookup('store_users').getById(id_card).data;
                                data['color']=this.component.color;
                                Ext.getCmp('full_card').getViewModel().setData(data);

                            }
                        }
                   },
                    defaults:{
                        style: {
                            textAlign:'center',
                            cursor:'pointer'
                        },

                    },
                   layout: {
                       type: 'vbox',
                       align: 'stretch',
                       pack: 'start'
                   },
                    items:[
                        {
                            xtype:'displayfield',
                            fieldStyle:{
                                color:'#2d2d2d',
                                fontWeight:'bolder',
                                fontSize: 'large'
                            },
                            flex:2,
                            value:item.data.number
                        },
                        {
                            xtype:'displayfield',
                            fieldStyle:{
                                color:'#2d2d2d',
                                fontWeight:'bolder',
                                fontSize: 'large'
                            },
                            flex:1,
                            value:item.data.task
                        }
                    ]
                });
            })
        });
        Ext.getCmp('board').add(items);
    },
    bind:{
        items:'{board_data}'
    }
});
var overrides = {
    startDrag: function(e) {
        console.log('startDrag');
    },
    onDrag: function() {
        console.log('onDrag');
    },
    onDragEnter: function(e, id) {
        console.log('onDragEnter');
    },
    onDragOver: function(e, id) {
        console.log('onDragOver');
    },
    onDragOut: function(e, id) {
        console.log('onDragOut');
    },
    onDragDrop: function(e, id) {
        console.log('onDragDrop');
    },
    onInvalidDrop: function() {
        console.log('onInvalidDrop');
    },
    endDrag: function(e, id) {
        console.log('endDrag');
    }
};