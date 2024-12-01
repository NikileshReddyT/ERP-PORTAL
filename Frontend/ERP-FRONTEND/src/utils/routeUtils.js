export const getHomeRouteForRole = (role) => {
  switch (role) {
    case 'ROLE_ADMIN':
      return '/admin/dashboard';
    case 'ROLE_FACULTY':
      return '/faculty/dashboard';
    case 'ROLE_STUDENT':
      return '/student/dashboard';
    default:
      return '/login';
  }
};

export const isAuthorizedForRoute = (pathname, role) => {
  const adminRoutes = ['/admin'];
  const facultyRoutes = ['/faculty'];
  const studentRoutes = ['/student'];
  const publicRoutes = ['/login', '/register'];

  // Check if it's a public route
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return { authorized: true, redirectTo: null };
  }

  // If user is not logged in (no role)
  if (!role) {
    return { authorized: false, redirectTo: '/login' };
  }

  // Check role-specific routes
  if (pathname.startsWith('/admin') && role !== 'ROLE_ADMIN') {
    return { authorized: false, redirectTo: getHomeRouteForRole(role) };
  }

  if (pathname.startsWith('/faculty') && role !== 'ROLE_FACULTY') {
    return { authorized: false, redirectTo: getHomeRouteForRole(role) };
  }

  if (pathname.startsWith('/student') && role !== 'ROLE_STUDENT') {
    return { authorized: false, redirectTo: getHomeRouteForRole(role) };
  }

  return { authorized: true, redirectTo: null };
};
