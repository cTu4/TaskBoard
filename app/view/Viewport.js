/**
 Main viewport
 */
Ext.define('TaskBoard.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'View.Viewport',
    requires: [
        'TaskBoard.view.UsersGrid',
        'TaskBoard.view.FullCard',
        'TaskBoard.view.Board',
        'TaskBoard.store.Users',
        'TaskBoard.view.Card',
        'TaskBoard.ViewModel.TestViewModel',
        'TaskBoard.ViewModel.TaskModel',
        'TaskBoard.ViewModel.BoardViewModel',
        'Ext.window.Toast'


    ],

    defaultListenerScope: true,

    items: [{
        xtype: 'board'
    },
        {
            xtype: 'full_card',
           // hidden:true
        }],

    readOnlyButton_click: function (self) {
        this.down('usersgrid').getViewModel().set('readOnly', self.pressed);
    }

});
