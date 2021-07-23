import { PermissionsEnum } from './permissionsEnum.ts';
import { PermissionsBitField } from '../../models/Permissions/PermissionsBitField.ts';
import { Permissions } from '../../models/Permissions/Permissions.ts';

export type PermissionsType = PermissionsEnum[];
export type BitFieldResolvable = PermissionsBitField | number | string | PermissionsBitField[];
export type PermissionResolvable = string | number | Permissions | BitFieldResolvable[];