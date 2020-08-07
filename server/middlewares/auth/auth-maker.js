export default {
    check: (ctx, requiredRole) => {
        let user = ctx.header.currentUser;
        if (!user) {
            ctx.throw("4012::未经授权账号");
        }
        if (!user.roles.includes(requiredRole)) {
            ctx.throw("4013::角色权限不足");
        }
    },
};
