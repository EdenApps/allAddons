# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    ldaps = fields.One2many(related='company_id.ldaps', string="LDAP Parameters", readonly=False)
