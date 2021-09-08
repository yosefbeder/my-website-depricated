const isAuthorized = (adminId?: string) => {
  if (!adminId) throw new Error('Admin-Id is required for this resource');
  else if (adminId && adminId !== process.env.ADMIN_ID)
    throw new Error("You're admin id isn't valid");
};

export default isAuthorized;
