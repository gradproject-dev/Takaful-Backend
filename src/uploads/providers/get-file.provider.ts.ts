import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { GenericFindOptions } from 'src/generic-module/types';
import { Repository } from 'typeorm';

@Injectable()
export class GetFileProvider {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadsRepo: Repository<Upload>,

    @Inject(forwardRef(() => GenericService))
    private readonly genericService: GenericService,
  ) {}

  public async getFiles(options?: GenericFindOptions<Upload>) {
    return await this.genericService.findAll(this.uploadsRepo, options);
  }
}
