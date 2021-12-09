import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Empresa} from './empresa.model';
import {Cliente} from './cliente.model';
import {Solicitud} from './solicitud.model';

@model()
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;


  @belongsTo(() => Empresa, {name: 'Empresa'})
  empresaId: string;

  @belongsTo(() => Administrador, {name: 'Administrador'})
  administradorId: string;

  @hasMany(() => Cliente)
  Cliente: Cliente[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
