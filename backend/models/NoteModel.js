import { Sequelize } from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize;

const Note = db.define("Note", {
    title: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}, {
    freezeTableName: true,
});

export default Note;

(async () => {
  await db.sync();
})();