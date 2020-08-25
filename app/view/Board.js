
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
    listeners:{
      afterLayout(){
          let without_plan =['progress','test','done'],
              without_progress=['plan','test','done'],
              without_test =['plan','progress','done'],
              without_done =['plan','progress','test'];
          let items = Ext.ComponentQuery.query('panel[class=source]');
          items.forEach(function (item){
              let group = '';
              switch (item.info.data.status){
                  case 'Plan':
                      group='plan';
                      break;
                  case 'In progress':
                      group='progress';
                      break;
                  case 'Testing':
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
                  },
                  describe(info){
                      info.setData('id',item.id_card);
                  },
                  constrain: Ext.getCmp('items').body.el.dom,
                  groups:group,
              });

          });
          items =  Ext.ComponentQuery.query('panel[class=target]');
          items.forEach(function (item){
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
                              let record = store.getById(id);
                              switch (status){
                                  case 'plan':
                                      status='Plan';
                                      break;
                                  case 'progress':
                                      status='In progress';
                                      break;
                                  case 'test':
                                      status='Testing';
                                      break;
                                  case 'done':
                                      status='Done';
                                      break;
                              }
                              record.set('status',status);
                              Ext.getCmp('board').getViewModel().getRoot().descend(['board_data']).formula.react();
                          });
                      }
                  }
              });
          });
      }
    },
    setItems(data){
        let board = Ext.getCmp('board');
        board.remove('items');
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
                       color='rgba(244,51,67,40%)';
                       break;
                    case 1:
                        color='rgba(255,255,0,50%)';
                        break;
                    case 2:
                        color='rgba(0,255,0,40%)';
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
                   // style:{
                   //     opacity:0.6,
                   // },
                   class:'source',
                   color:color,
                   selected:false,
                   margin: 10,
                   listeners:{
                        afterRender(){

                        },
                        click:{
                            element:'body',
                            fn(){
                                let color = '';
                                let sel_card = Ext.getCmp('items').down('[selected=true]');
                                if (sel_card!=null){
                                    color = EditRgba(sel_card.color,70);
                                    sel_card.setBodyStyle('background',color);
                                    sel_card.selected=false;
                                }
                                let id_card = this.component.id_card;
                                let card = Ext.getCmp('items').down('[id_card='+id_card+']');
                                card.selected=true;
                                color = EditRgba(card.color,100);
                                card.setBodyStyle('background',color);
                                let data = Ext.data.StoreManager.lookup('store_users').getById(id_card).data;
                                data['color']=color;
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
function EditRgba(color,opacity){
    let arr = color.split(',');
    arr[3] = opacity+'%)';
    return arr[0]+','+arr[1]+','+arr[2]+','+arr[3];
}