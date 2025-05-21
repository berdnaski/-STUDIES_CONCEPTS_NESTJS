import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PersonsModule } from 'src/persons/persons.module';
import { MessagesUtils, MessagesUtilsMock } from './messages.utils';
import { SERVER_NAME } from 'src/common/constants/server-name.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => PersonsModule),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    {
      provide: MessagesUtils,
      useValue: new MessagesUtilsMock(),
    },
    {
      provide: SERVER_NAME,
      useValue: 'My Name Is nestJS',
    },
  ],
  exports: [MessagesUtils, SERVER_NAME],
})
export class MessagesModule {}
