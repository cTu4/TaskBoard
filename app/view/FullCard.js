Ext.define('TaskBoard.view.FullCard',{
    extend: 'Ext.panel.Panel',
    xtype: 'full_card',
    id:'full_card',
    reference: 'full_card',
    viewModel:{
        type: 'TaskModel'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    titleAlign: 'center',
    bodyPadding: '10px',
    defaults:{
        style: {
            textAlign:'center'
        },
    },
    setHeader(color){
      this.header.setStyle('background',color);
    },
    items:[
                {
                    xtype: 'displayfield',

                    bind:{
                        value:"Наименование задачи: '{task}'"
                    }
                },
                {
                    xtype: 'displayfield',
                    bind:{
                        value:"<p>Испольнитель: {surname} {name}</p>"
                    }
                },
                {
                    xtype: 'displayfield',
                    bind:{
                        value:"<p>Статус: {status}</p>"
                    }
                },
                {
                    xtype: 'displayfield',
                    bind:{
                        value:"<p>Важность: {important_text}</p>"
                    }
                },
                {
                    xtype: 'displayfield',
                    bind:{
                        value:"<p>Дата: {date}</p>"
                    }
                }
    ],
    title:{
        cls:'header-title-cls'
    },
    bind:{
        title:'Задача {number}',
        header:'{color}'
    }
});