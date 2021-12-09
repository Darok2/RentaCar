import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Administrador, Empresa, Cliente, Solicitud} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {EmpresaRepository} from './empresa.repository';
import {ClienteRepository} from './cliente.repository';
import {SolicitudRepository} from './solicitud.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly Asesores: HasManyRepositoryFactory<Administrador, typeof Asesor.prototype.id>;

  public readonly Empresa: BelongsToAccessor<Empresa, typeof Asesor.prototype.id>;

  public readonly Administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  public readonly Cliente: HasManyRepositoryFactory<Cliente, typeof Asesor.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Asesor, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.Cliente = this.createHasManyRepositoryFactoryFor('Cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('Cliente', this.Cliente.inclusionResolver);
    this.Administrador = this.createBelongsToAccessorFor('Administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('Administrador', this.Administrador.inclusionResolver);
    this.Empresa = this.createBelongsToAccessorFor('Empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('Empresa', this.Empresa.inclusionResolver);
    this.Asesores = this.createHasManyRepositoryFactoryFor('Asesores', administradorRepositoryGetter,);
    this.registerInclusionResolver('Asesores', this.Asesores.inclusionResolver);
  }
}
