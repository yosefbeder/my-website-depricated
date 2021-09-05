const isAuthorized = (adminId?: string) => {
  if (!adminId)
    throw { status: 401, message: 'Admin-Id is required for this resource' };
  else if (adminId && adminId !== process.env.ADMIN_ID)
    throw { status: 403, message: "You're Admin-Id isn't valid" };
};

export default isAuthorized;
