/**
 Main viewport
 */
Ext.define('TaskBoard.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'View.Viewport',
    requires: [
        'TaskBoard.view.FullCard',
        'TaskBoard.view.Board',
        'TaskBoard.store.Users',
        'TaskBoard.ViewModel.TaskModel',
        'TaskBoard.ViewModel.BoardViewModel'
    ],

    defaultListenerScope: true,
    layout: 'border',
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: true
    },
    items: [
        {
            xtype: 'board',
            region:'center',
            collapsible:false
        },
        {
            xtype:'panel',
            title: 'Полная информация о задаче',
            titleAlign:'center',
            layout:'anchor',
            minWidth:450,
            items:{
                xtype: 'full_card'
            },
            region: 'east'
        }],


});
