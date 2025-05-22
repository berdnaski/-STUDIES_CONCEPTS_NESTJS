import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PersonsModule } from 'src/persons/persons.module';
import { MessagesUtils } from './messages.utils';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => PersonsModule),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesUtils],
  exports: [MessagesUtils],
})
export class MessagesModule {}
