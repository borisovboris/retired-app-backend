import { Module } from '@nestjs/common';
import { BaseModule } from 'src/base/base.module';
import { SessionController } from './session.controller';

@Module({
  controllers: [ SessionController ],
  imports: [ BaseModule ]
})
export class SessionModule {

}
