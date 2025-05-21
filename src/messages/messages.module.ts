import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PersonsModule } from 'src/persons/persons.module';
import { MessagesUtils } from './messages.utils';
import { RegexFactory } from 'src/common/regex/regex.factory';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
} from './messages.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => PersonsModule),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessagesUtils,
    RegexFactory,
    {
      provide: REMOVE_SPACES_REGEX,

      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('RemoveSpacesRegex');
      },

      inject: [RegexFactory],
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,

      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('OnlyLowercaseLettersRegex');
      },

      inject: [RegexFactory],
    },
  ],
  exports: [MessagesUtils],
})
export class MessagesModule {}
