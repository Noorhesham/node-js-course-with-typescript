import { CurrentUser } from 'sanity'

export const userIsAdministrator = (
  currentUser: Omit<CurrentUser, 'role'> | null,
) => {
  if (!currentUser) return null

  const roles = currentUser.roles.map((role) => role.name)
  return roles.includes('administrator')
}
