import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Empresa, Asesor} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {AsesorRepository} from './asesor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly Empresa: BelongsToAccessor<Empresa, typeof Administrador.prototype.id>;

  public readonly Asesores: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Administrador, dataSource);
    this.Asesores = this.createHasManyRepositoryFactoryFor('Asesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('Asesores', this.Asesores.inclusionResolver);
    this.Empresa = this.createBelongsToAccessorFor('Empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('Empresa', this.Empresa.inclusionResolver);
  }
}
