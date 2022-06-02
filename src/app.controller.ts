import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('agora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-token')
  getHello(@Body() params: any): string {
    return this.appService.generateToken(params);
  }
}
