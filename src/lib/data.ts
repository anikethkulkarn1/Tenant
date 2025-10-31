export const teamMembers = [
  {
    id: "USR-001",
    name: "Admin User",
    email: "admin@acme.com",
    avatar: "user-avatar-main",
    role: "admin",
    status: "active",
    lastLogin: "2 minutes ago",
  },
  {
    id: "USR-002",
    name: "Sarah Lee",
    email: "sarah@acme.com",
    avatar: "user-avatar-1",
    role: "member",
    status: "active",
    lastLogin: "1 day ago",
  },
  {
    id: "USR-003",
    name: "John Doe",
    email: "john.d@acme.com",
    avatar: "user-avatar-2",
    role: "member",
    status: "invited",
    lastLogin: "N/A",
  },
  {
    id: "USR-004",
    name: "Maria Garcia",
    email: "maria@acme.com",
    avatar: "user-avatar-3",
    role: "member",
    status: "active",
    lastLogin: "3 days ago",
  },
  {
    id: "USR-005",
    name: "Chen Wei",
    email: "chen.w@acme.com",
    avatar: "user-avatar-4",
    role: "admin",
    status: "active",
    lastLogin: "1 week ago",
  },
];

export const auditLogs = [
  { id: 1, user: 'Admin User', email: 'admin@acme.com', action: 'Created new API key', ip: '192.168.1.1', date: '2024-07-30 10:00:00' },
  { id: 2, user: 'Chen Wei', email: 'chen.w@acme.com', action: 'Updated billing information', ip: '10.0.0.5', date: '2024-07-30 09:45:12' },
  { id: 3, user: 'Sarah Lee', email: 'sarah@acme.com', action: 'User login successful', ip: '172.16.0.10', date: '2024-07-30 09:30:05' },
  { id: 4, user: 'John Doe', email: 'john.d@acme.com', action: 'Failed login attempt', ip: '203.0.113.25', date: '2024-07-29 18:00:00' },
  { id: 5, user: 'Admin User', email: 'admin@acme.com', action: 'Invited new user: john.d@acme.com', ip: '192.168.1.1', date: '2024-07-29 17:55:00' },
];

export type TeamMember = typeof teamMembers[0];
export type AuditLog = typeof auditLogs[0];
