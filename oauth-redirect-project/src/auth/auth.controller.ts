import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
//@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('callback')
  //@Get()
  async handleCallback(
    @Query('code') code: string,
    @Query('id_token') id_token: string,
    @Res() res: Response,
  ) {
    if (!code) {
      return res.status(400).send('No code provided');
    }

    try {
      const token = await this.authService.getAccessToken(code);
      // En un caso real, probablemente querrías almacenar el token de forma segura
      // y/o usarlo para hacer llamadas a la API de Power BI
      res.send(`Access token obtained: ${token.access_token}`);
    } catch (error) {
      console.log('Error obtaining access token:', error);
      res.status(500).send('Error obtaining access token');
    }
  }
}
