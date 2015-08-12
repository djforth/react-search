"use strict";

var ColumnsDispatcher = require("../dispatcher/columns_dispatcher");

module.exports = {
  addDateRange: function addDateRange(cols) {
    ColumnsDispatcher.handleAddingColumns({
      type: "ADDING_COLUMNS",
      columns: cols
    });
  },

  changeDevice: function changeDevice(device) {
    ColumnsDispatcher.handleChangeDevice({
      type: "CHANGE_DEVICE",
      device: device
    });
  }
};
//# sourceMappingURL=columns_actions.js.map