import User from "../schema/user";
import Role from "../schema/role";
import { ROLE_USER } from "../const";

export default {
    getUser: async (id) => {
        return await User.findByPk(id);
    },
    checkUser: async (name) => {
        return await User.findOne({
            where: {
                name: name,
            },
        });
    },
    getRoles: async (uid) => {
        let rolesModel = await Role.findAll({ where: { uid: uid } });
        if (rolesModel.length <= 0) {
            await Role.create({ uid: uid, role: ROLE_USER });
            rolesModel = await Role.findAll({ where: { uid: uid } });
        }
        const roles = [];
        rolesModel.forEach((r) => roles.push(r.role));
        return roles;
    },
};
